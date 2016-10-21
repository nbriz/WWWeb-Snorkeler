
/*

	TODO NOTES:

	- css/js tabs ( on hold for now )

	- code snippets
	
   	- video errors that interrupt tutorial video && return where last left off??? 
   	( point to <tag> text overlay, rather than speaking it )


	
*/


/////////////// UTILS /////////////////////////////////////

// KLUDGEY WORK-AROUND !!!!
// for this issue: http://stackoverflow.com/questions/39310550/firefox-add-on-sdk-port-on-port-emit-disrupted-by-iframe
var addy = addon;

function eID( id ){ return document.getElementById( id ); }

function eNew( css ) {
	// create overlay divydiv elements w/CSS
	var ele = document.createElement('divydiv');
	// normalize divydiv
	ele.style.display = "block";
	ele.style.margin = 0;
	ele.style.padding = 0;
	ele.style.border = 0;
	// apply custom css
	if( css )
		for ( key in css ) ele.style[key] = css[key];	
	return ele;
};


// ---------------------------------------------------------------------
// tutorial stuff --------------------------------------------------------
// ---------------------------------------------------------------------

var tutObj;		// the tutorial info object 
var tutPlyr;	// the tutorial player instance  
var tutPlyrEle;	// the element the tutorial player is in
var tutLooper; // looping interval for timing video stuff

function makeTutorialElements(){
	// setup / display controls
	eID('controls').onclick = function(){ 
		if( this.getAttribute('data-loaded')=="false" ){
			addy.port.emit('start-tutorial');
			this.setAttribute('data-loaded','true');
			this.setAttribute('data-status','playing');
			this.innerHTML = "▎▎[pause tutorial]";
		}
		else {
			if( this.getAttribute('data-status')=="paused"){
				tutPlyr.playVideo();
				this.innerHTML = "▎▎[pause tutorial]";
				this.setAttribute('data-status','playing');												
			}
			else if( this.getAttribute('data-status')=="playing"){
				tutPlyr.pauseVideo();
				this.innerHTML = "▶ [play tutorial]";
				this.setAttribute('data-status','paused');
			}
		}
	}
	eID('controls').style.display = "block";
	// make video player element  
	tutPlyrEle = eNew({ 
		position: "absolute",
		zIndex: "1",
		top:"35px", left:"0px",
		opacity: 0.25
	});
	tutPlyrEle.id = "tutPlayer";
	document.body.appendChild( tutPlyrEle );

	// make sure editor background is invisible so video can be visible
	document.querySelector('.cm-s-bb-code-styles').style.background = "rgba(255,255,255,0)"
}


function onYouTubeIframeAPIReady() {
	// create player instance
	tutPlyr = new YT.Player('tutPlayer', {
		playerVars: { 'autoplay': 1, 'controls': 0, 'rel':0 },
		height: '345',
		width: '600',
		videoId: tutObj.videos[0]
	});

	// set controls 
	eID('controls').innerHTML = "▎▎[pause tutorial]";
	eID('controls').setAttribute('data-status','playing');
	// start video loop
	var lastT;
	tutLooper = setInterval(function(){

		var t = Math.floor(tutPlyr.getCurrentTime());
		// maybe round to first place: 23.4 ( instead of whole number )

		if( tutObj.script.hasOwnProperty(t) ){

			if( tutObj.script[t]=="fadeOut"){
				// fade out the code && fade in the video
				eID('tutPlayer').style.opacity = parseFloat(eID('tutPlayer').style.opacity) + 0.75/30;
				document.querySelector('.CodeMirror-lines').style.opacity = 0;
			
			} else if( tutObj.script[t]=="fadeIn" ){
				// fade out the video && fade in the code
				eID('tutPlayer').style.opacity = parseFloat(eID('tutPlayer').style.opacity) - 0.75/30;
				document.querySelector('.CodeMirror-lines').style.opacity = 1;
			
			} else if(lastT!==t) {
				// edit the code w/new code from data.json
				edtr.editor.setValue( tutObj.script[t] );
				edtr.update();
			}			
		}

		lastT = t;
	},1000/30);
}   

// receive tutorial info from index
addy.port.on('tutorial-nfo',function( tut ){
	// update tutObj w/response from API call in index
	tutObj = tut;
	// insert youtube api ( should fire onYouTubeIframeAPIReady )
	var tag = document.createElement('script');
		// tag.src = "libs/www-widgetapi.js";
		tag.src = "https://www.youtube.com/iframe_api";    
	var scpt = document.getElementsByTagName('script')[0];
	    scpt.parentNode.insertBefore(tag, scpt);
});



// ---------------------------------------------------------------------
// editor stuff --------------------------------------------------------
// ---------------------------------------------------------------------


// create an html editor 
// w/custom modalCSS, so that it plays nice in sidebar
var edtr = new WWWEditor({
	id: "snorkeler-editor",
	type: "html",
	friendlyErrors: false, 
	autoUpdate: true,
	modalCSS: {
		fontSize: '1em',
		lineHeight: '1.5em',
		fontFamily: 'inconsolata, monospace',
		letterSpacing: '0.3px',
		wordSpacing: '1px',
		position: 'absolute',
		zIndex: 9999999, 
		top: "0px",
		right: "0px",
		boxShadow: "-3px 3px 2px 0 rgba(0, 0, 0, 0.5)",
		webkitBoxShadow: "-3px 3px 2px 0 rgba(0, 0, 0, 0.5)",
		padding: "10px",
		background: 'rgba(39,40,34,0.9)',
		color: '#fff',
		width: '330px',
		fontWeight: 300
	}	
});



// override default _previewFrame function
// so that it passes new value over to main index.js file
edtr._previewFrame = function( value ){
	addy.port.emit('update',value);
};


// let index know that editor is in focus
// so that it lets Selector know to close itself
edtr.editor.on('focus',function(){
	addy.port.emit('editor-focus');
});


// receive DOM of current tab from index.js
addy.port.on('passDOM',function( doc ){
	// add that DOM's code to editor 
	if( doc.doctype ) edtr.editor.setValue( doc.doctype + "\n" + doc.html );
	else edtr.editor.setValue( doc.html );
	edtr.uiTip = true;
	edtr.firstError = false;
	edtr.firstMessage = false;	
	// is this a lesson page?
	if( doc.location.host=="netart.rocks" ){
		if( doc.location.pathname.indexOf("/tutorials/")==0 ){
			edtr.friendlyErrors = true;
			makeTutorialElements();		
		}
		if( doc.location.pathname.indexOf("/files/")==0){
			edtr.friendlyErrors = true;
		}
	} 		
	else edtr.friendlyErrors = false;
	

	// make sure right distance form top...
	eID('snorkeler-editor').style.top = "35px";

	// account for "top" offset
	eID('snorkeler-editor').style.height = window.innerHeight - 35 + "px";

	// send editor value back to sidebar
	addy.port.emit('update',edtr.editor.getValue());
});






// ---------------------------------------------------------------------
// Selector stuff ----------------------------------------------------------
// ---------------------------------------------------------------------

// receive new selected target from index ( who got it from Selector )
addy.port.on('new-target',function( targ ){
	// remove selection if any
	edtr.editor.setSelection({line:0,ch:0},{line:0,ch:0});

	var targNfo = {
		line:0,
		html:targ.html,
		matches:[]
	}
	// update targNfo
	edtr.editor.eachLine(function(h){
		if( h.text.indexOf(targ.html)>=0){ 
			targNfo.matches.push( {line:targNfo.line, html:h.text} );
		}
		targNfo.line++;
	});

	if( targNfo.matches[0] ){
		// get positions
		var l = targNfo.matches[0].line;
		var c = edtr.editor.getLine(l).indexOf(targ.html);
		var lastQtr = targ.html.substr((targ.html.length/4)*3)
		var c2 = edtr.editor.getLine(l).indexOf( lastQtr )+lastQtr.length;
		// place cursor on match + scroll editor
		edtr.editor.setCursor({line:l,ch:0});
		var scr = edtr.editor.getScrollInfo();
		var th = edtr.editor.defaultTextHeight();
		edtr.editor.scrollTo(0,scr.top+scr.clientHeight-(th*3));
		// select it
		edtr.editor.setSelection({line:l,ch:c},{line:l,ch:c2})		
	} else {
		// TODO: handle when selection isn't on a single line 
		addy.port.emit('unselectable');
	}
});

// receive new html string for targetLine from index via Selector
addy.port.on('selector-editing',function(htmlstr){
	if( edtr.editor.somethingSelected() ){
		edtr.editor.replaceSelection(htmlstr);	
	}
});

// receive unlock element selector message from index
// ...when it receives it from Selector
addy.port.on('unlock-element-selector',function(){
	eID('selector').className = "sub-item";
});

// receive update message from index
// ...when it receives it from Selector
addy.port.on('update-editor',function(){
	edtr.editor.setSelection({line:0,ch:0},{line:0,ch:0});
	edtr.update();
});






// ---------------------------------------------------------------------
// menu stuff ----------------------------------------------------------
// ---------------------------------------------------------------------

addy.port.on('version',function(v){
	var msg = 'hi! my name is <a href="http://nickbriz.com" target="_blank">Nick Briz</a>'+
	' && this is the first version of the "WWWeb Snorkeler" (v'+v+')'+
	' a "critical courseware" Firefox addon for interactively following along w/my hypermedia series'+
	' “How To / Why Make Internet Art”.'
	eID('nfo-content').innerHTML = msg;
});

function showingSub(){
	if(
		eID('nfo-pane').style.display == "block" ||
		eID('snippets-submenu').style.display == "block" ||
		eID('tools-submenu').style.display == "block"		
		) return true;
	else return false;
}

function download(filename, text) {
	//http://stackoverflow.com/a/18197511/1104148
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function showSub( item ){
	var l = eID(item).offsetLeft;
	// var r = l + 95; // .sub: padding=20px + width=75px
	// l = (r>innerWidth) ? innerWidth-95 : l;
	while(l+150>innerWidth-20){ l--; } // 150 = width
	eID(item+"-submenu").style.left = l+"px";
	eID(item+"-submenu").style.display = "block";
}

function hideSub( item ){
	if( item ) eID( item ).style.display = "none";
	else {
		eID('nfo-pane').style.display = "none";
		eID('snippets-submenu').style.display = "none";
		eID('tools-submenu').style.display = "none";
	}
} hideSub();


// HOLD FOR NOW
// function showTabs( ele ){
// 	eID('show-tabs').textContent="hide tabs";
// 	eID('tabs').style.top = "32px";
// 	eID('snorkeler-editor').style.top = "67px";
// 	eID('snorkeler-editor').style.height = window.innerHeight - 67 + "px";
// }

// function hideTabs( ele ){
// 	eID('show-tabs').textContent="show tabs";
// 	eID('tabs').style.top = "0px";
// 	eID('snorkeler-editor').style.top = "35px";
// 	eID('snorkeler-editor').style.height = window.innerHeight - 35 + "px";

// } hideTabs();

// when submenu is open && hover over other menus ------
document.body.addEventListener('mouseover',function(e){
	if( showingSub() ){
		if( e.target.id=="snippets" || e.target.id=="snippets-submenu" ){
			if( eID('snippets-submenu').style.display=="none"){
				hideSub(); showSub('snippets');
			}
		}
		else if( e.target.id=="tools" || e.target.id=="tools-submenu" ) {
			if( eID('tools-submenu').style.display=="none"){
				hideSub(); showSub('tools');
			}
		}
	}
});
// when submenu is open && click on stuff...
document.body.addEventListener('click',function(e){
	if(e.target.id=="snippets"){
		hideSub(); showSub('snippets');
	}
	else if(e.target.id=="tools"){
		hideSub(); showSub('tools');
	}
	// else if(e.target.id=="show-tabs"){
	// 	hideSub();
	// 	if( e.target.textContent=="hide tabs" ) hideTabs();
	// 	else showTabs();
	// }
	else if(e.target.id=="nfo"){
		hideSub();
		eID('nfo-pane').style.display = "block";
	}
	else if(e.target.id=="nfo-close"){
		hideSub('nfo-pane');
	}	
	else if(e.target.id=="unminify"){
		hideSub();
		var value = edtr.editor.getValue();
		var clean = html_beautify(value,{
			indent_inner_html: true,
			indent_size: 1,
			indent_char: '\t'
		});
		edtr.editor.setValue( clean );	
	}
	else if(e.target.id=="save"){
		hideSub();
		var filename = prompt('save as...');
		if( filename )
			download(filename, edtr.editor.getValue() );
	}	
	else if(e.target.id=="selector" && e.target.className=="sub-item"){
		hideSub();
		e.target.className = "sub-item-locked"
		addy.port.emit('show-selector');
	}
	else if(e.target.id=="template" && e.target.className=="sub-item"){
		hideSub();
		addy.port.emit('jump-to-template');
	}	
	else if(e.target.id=="comingsoon" && e.target.className=="sub-item"){
		hideSub();
		alert('these snippets are gonna be so useful i swear! ...not ready yet though');
	}
	else if(e.target.id=="moresoon" && e.target.className=="sub-item"){
		hideSub();
		alert('Oh man! i\'ve got so many cool ideas... but not enough time >_<, there will be more tools soon i promise!');
	}
	else if( showingSub() ){
		hideSub();
	}
});



//////////////////////////// DEBUG /////////////////////////

function log( stuff ){ console.log( stuff ); }

document.body.addEventListener('keydown',function(e){
	switch(e.key){
		case "q" : /**/; break;
	}
});