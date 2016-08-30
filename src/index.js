
var buttons 	= require('sdk/ui/button/action');
var sidebars 	= require("sdk/ui/sidebar");
var tabs 		= require("sdk/tabs");
var pageMod 	= require("sdk/page-mod");


var wrkrs = []; // holds workers
var tWrkr;		// worker for tab listener


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
		sidebar.show();
	}
});


// ---------------------------------------------------------------------
// tab listener  -------------------------------------------------------
// ---------------------------------------------------------------------

var DOM; // holds current tab's DOM object

// when a new page is loaded...
tabs.on('ready', function(tab) {
	// inject content script which emits back the DOM nfo of active tab
	tWrkr = tab.attach({
		contentScriptFile: './get-page-dom.js'
	});
	// when worker receives DOM nfo from get-page-dom.js 
	// hide sidebar (if open from prev tab||page) && update DOM object 
	tWrkr.port.on("newDOM", function(data) {
		sidebar.hide();
		DOM = data;
	});
	
	// getColor();
});


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
	id: 'wwweb-snorkeler',
	title: 'WWWeb Snorkeler', 
	url: "./sidebar.html",
	onAttach: function(worker){
		// sidebar attached but not ready...
	},
	onReady: function(worker){
		wrkrs.push(worker);
		// pass DOM to the sidebar.js
		worker.port.emit( "passDOM", DOM );
		// when sidebar emits "update" update content w/code from editor (ie. sidebar)
		worker.port.on("update", function(value) {
			updatePageContent( value );
		});	
		// when sidebar emits "show-selector" inject selector code into active tab
		worker.port.on("show-selector", injectSelector );
		// when editor is in focus let Selector know
		worker.port.on('editor-focus',function(){
			if(selWrkr) selWrkr.port.emit('editor-focus');
		});
		// when editor cannot select what selector's target
		// let selector know abuot it
		worker.port.on('unselectable',function(){
			if(selWrkr) selWrkr.port.emit('unselectable');
		});		
	},
  	onDetach: function(worker) {
  		// still not sure when this runs? think on [x]close? 
		// either way, get rid of the old worker ( free up it's memory )
		var index = wrkrs.indexOf(worker);
		if(index != -1) wrkrs.splice(index, 1);
	}
});



// ---------------------------------------------------------------------
// color picker  -------------------------------------------------------
// ---------------------------------------------------------------------


function getColor(){

	tabs.activeTab.attach({ 
		contentScriptFile: './libs/html2canvas.min.js',
		contentScript: 
			// 'html2canvas(document.documentElement.children[1]).then(function(canvas) {'+
			'html2canvas(document.body).then(function(canvas) {'+
			    'var dataURL = canvas.toDataURL();'+
			    'console.log(dataURL);'+
			'});'
	});

}

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
		wrkrs[0].port.emit("unlock-element-selector");
	});

	// when selector is editing an element
	// let the sidebar know about it
	selWrkr.port.on('selector-editing',function( htmlstr ){
		//sidebar.hide();
		wrkrs[0].port.emit("selector-editing", htmlstr );
	});

	// when selector requests that editor be updated
	selWrkr.port.on('update-editor',function(){
		wrkrs[0].port.emit('update-editor');
	});


	// when worker receives newDOM from Selector ( as a result of editing the element )
	// pass it along to sidebar.js
	selWrkr.port.on("new-target", function( data ) {
		// sidebar.hide();
		// DOM = data;
		wrkrs[0].port.emit("new-target", data );
	});


}
