
var buttons 	= require('sdk/ui/button/action');
var sidebars 	= require("sdk/ui/sidebar");
var tabs 		= require("sdk/tabs");
var pageMod 	= require("sdk/page-mod");
var Request 	= require("sdk/request").Request;

var { setTimeout } = require("sdk/timers");

var version = "0.0.7";

var sWrkr; 		// current sidebar worker ( new everytime sidebar opens )
var tWrkr;		// current tab worker  ( new everytime new tab is open )
var Height;		// last registered page height ( used to close sidebar: hack/fix for: https://github.com/nbriz/WWWeb-Snorkeler/issues/4 )
var TAB = {}; 	// dictionary, holds all custom tab's object
var tID; 		// current tab's id
var sidebarOpen = false;

// ---------------------------------------------------------------------
// check for updates ---------------------------------------------------
// ---------------------------------------------------------------------

var updates = Request({
	url: 'http://netart.rocks/api?addon=true',
	onComplete: function (response) {
		var data = JSON.parse(response.text);
		if( version!==data.latest.version ){
			tabs.activeTab.attach({ 
				contentScript:'alert("Hey! sorry to bug u, but u\'re running an old version of the WWWeb Snorkeler addon,'+
								' visit http://netart.rocks to get the latest one! >> '+
								data.latest.info+'");' 
			});
		}								
	}
});
updates.get();

// ---------------------------------------------------------------------
// create browser addon icon/button ------------------------------------
// ---------------------------------------------------------------------

var button = buttons.ActionButton({
	id: "wwweb-snorkeler-addon",
	label: "WWWeb Snorkeler",
	icon: {
		"32": "./icons/icon-32.png",
		"48": "./icons/icon-48.png",
		"64": "./icons/icon-64.png",
		"96": "./icons/icon-96.png"
	},
	onClick: function(state){
		if( !sidebarOpen && tID 
			&& typeof TAB[tID].location!=="undefined" 
			&& TAB[tID].location.href.indexOf('http')==0 
			// ^ ie. not a mozilla tab ( about:, etc. )
		)
			sidebar.show();		
		else 
			sidebar.hide();
	}
});




// ---------------------------------------------------------------------
// tab listener  -------------------------------------------------------
// ---------------------------------------------------------------------

function prepNewTab(tab){
	// make sure TAB[tab.id] has been created in 'activate' listener
	// before proceeding w/the rest
	if( typeof TAB[tab.id] === "undefined"){
		setTimeout(function(){ prepNewTab(tab); },250);
		return;
	} 

	// inject content scripts, which return DOM && listen for Height changes
	tWrkr = tab.attach({
		contentScriptFile: [ 
			'./get-page-dom.js',
			'./listen-for-resize.js'
		]
	});	

	// -------------------- getDOM --------------------
	// when worker receives DOM nfo from get-page-dom.js 
	tWrkr.port.on("newDOM", function(data) {
		TAB[tab.id].location = data.location; 
		TAB[tab.id].doctype = data.doctype;
		TAB[tab.id].html = data.html;
		if(sWrkr) sWrkr.port.emit( "passDOM", TAB[tab.id] );
		// if template page, open sidebar by default
		if( TAB[tab.id].location.href=="http://netart.rocks/files/template.html") sidebar.show();
	});	


	// ------------- listenForHeightChange ------------
	// when worker receives DOM nfo from get-page-dom.js 
	tWrkr.port.on("pageHeight", function(height) {
		if( Height !== height ) sidebar.hide();
		Height = height;
	});	
}


// when tab is made active...
tabs.on('activate', tab => {  
	tID = tab.id;	
	if( typeof TAB[tID] == "undefined" ){ // ---- if it's a new tab, set it up in the dictionary  
		TAB[tID] = { 
			sidebarOpen:false,
			passedDOM: false, // hasn't passed DOM to sidebar yet ( happens on open )
		};	
		if( sidebarOpen ) sidebar.hide();	
	} else { 							// ---- otherwise handle sidebar
		if( sidebarOpen ){ // if sidebar is open
			if( TAB[tID].sidebarOpen ){ 
				// reload it's proper contents
				sidebar.hide(); sidebar.show();
			} else sidebar.hide(); // otherwise hide it
			
		} else {
			// if sideBar is closed, open it if this tab had left it open
			if( TAB[tID].sidebarOpen ) sidebar.show();
		}
	}
});

// when tab is hidden (b/c another is made active)
tabs.on('deactivate', tab => { });

// when a new page is loaded...
tabs.on('ready', tab => {  		
	// console.log('ready',tab.id)
	prepNewTab( tab );
});

// when tab is closed ( get rid of this tab's data from TAB dictionary )
tabs.on('closed', tab => {  TAB[tab.id] = undefined; }); 

// when new page is loaded into current tab
// tabs.on('load', tab => { 
// }); 




// ---------------------------------------------------------------------
// create sidebar  -----------------------------------------------------
// ---------------------------------------------------------------------

function updatePageContent( value ){
	// function for updating the current tab's content 
	// 	w/the code from the sidebar
	// runs when sidebar emits "update"	
	var codeStr = value.replace(/'/g, "\\'");
		codeStr = codeStr.replace(/"/g,'\\"');
		codeStr = codeStr.replace(/\n/g,'');

	tabs.activeTab.attach({ 
		contentScript: 	
			'var parser = new DOMParser();'+
			"var doc = parser.parseFromString(' "+codeStr+" ', 'text/html');"+
			'document.head.innerHTML = doc.head.innerHTML;'+
			'document.body.innerHTML = doc.body.innerHTML;'
	});
}

var sidebar = sidebars.Sidebar({
	id: 'sidebar',
	title: 'WWWeb Snorkeler', 
	url: "./sidebar.html",
	onAttach: function(worker){
		// sidebar attached but not ready...
	},
	onReady: function(worker){
		TAB[tID].sidebarOpen = true; // this particular tab has opened the sidebar
		sidebarOpen = true;		// sidebar is currently open
		
		sWrkr = worker; // reassign global sidebar-worker variable
		
		// pass version...
		worker.port.emit('version',version);
		
		// pass DOM to the sidebar.js
		if( !TAB[tID].passedDOM  ){
			// if never passed before
			worker.port.emit( "passDOM", TAB[tID] );
			TAB[tID].passedDOM = true;
		} else {
			// if previously passed for this TAB
			worker.port.emit("passDOM", { 
				location: TAB[tID].location,
				html: TAB[tID].editorValue 
			});
		}

		
		// when sidebar emits "update" update content w/code from editor (ie. sidebar)
		worker.port.on("update", function(value) {
			TAB[tID].editorValue = value;
			updatePageContent( value );
		});	
		// when sidebar emits "show-selector" inject selector code into active tab
		worker.port.on("show-selector", injectSelector );
		// when sidebar emits "jump-to-template" navigate to template page
		worker.port.on("jump-to-template", function(){
			tabs.open("http://netart.rocks/files/template.html");
		});
		// when editor is in focus let Selector know
		worker.port.on('editor-focus',function(){
			if(selWrkr) selWrkr.port.emit('editor-focus');
		});
		// when editor cannot select what selector's target
		// let selector know abuot it
		worker.port.on('unselectable',function(){
			if(selWrkr) selWrkr.port.emit('unselectable');
		});		
		// when user clicks on "start tutorial" in the sidebar nfo-pane
		// get that tutorial's info && send it bax to the sidebar
		worker.port.on('start-tutorial',function(){
			var pa = TAB[tID].location.pathname.substr(11,TAB[tID].location.pathname.length).split('/');
			var tut = Request({
				url: 'http://netart.rocks/api?season='+pa[0]+'&episode='+pa[0],
				onComplete: function (response) {
					worker.port.emit('tutorial-nfo', {
						videos: JSON.parse(response.text).data.videos,
						script: JSON.parse(response.text).data.script,
						season: JSON.parse(response.text).season,
						episode: JSON.parse(response.text).episode,
					});					
				}
			});
			tut.get();	
		});
		// resize it...
		var utils = require('sdk/window/utils');
		var win = utils.getMostRecentBrowserWindow();
		if (utils.isBrowser (win)){
		    var sidebar = win.document.getElementById ("sidebar");
		    sidebar.style.minWidth = "600px";		    
		    sidebar.style.width = "600px";
		}
	},
  	onDetach: function(worker) {
  		TAB[tID].sidebarOpen = false; 
  		sidebarOpen = false;
	}
});








// ---------------------------------------------------------------------
// Selector ------------------------------------------------------------
// ---------------------------------------------------------------------
var selWrkr;

// inject the codemirror css ( for Selector 'source code' section )
pageMod.PageMod({
	include: "*",
	contentStyleFile: './css/wwweditor.css'
});

function injectSelector(){
	// inject codemirror ( for Selector 'source code' section )
	// inject html-elements-dict ( for 'html info' section )
	// inject Selector class && instantiate a new instance 
	selWrkr = tabs.activeTab.attach({ 
		contentScriptFile: [
		'./libs/codemirror.js',
		'./libs/xml.js',
		'./libs/html-elements-dictionary.js',
		'./libs/html-attributes-dictionary.js',
		'./Selector.js'],
		contentScript: 
			'var selector = new Selector( document.body );'
	});

	// when selector is on, u can no longer click that menu item
	// until Selector.js worker let's us know to unlock the menu item
	// pass this info along to sidebar...
	selWrkr.port.on('unlock-element-selector',function(){
		sWrkr.port.emit("unlock-element-selector");
	});

	// when selector is editing an element
	// let the sidebar know about it
	selWrkr.port.on('selector-editing',function( htmlstr ){
		sWrkr.port.emit("selector-editing", htmlstr );
	});

	// when selector requests that editor be updated
	selWrkr.port.on('update-editor',function(){
		sWrkr.port.emit('update-editor');
	});


	// when worker receives newDOM from Selector ( as a result of editing the element )
	// pass it along to sidebar.js
	selWrkr.port.on("new-target", function( data ) {
		sWrkr.port.emit("new-target", data );
	});

}



