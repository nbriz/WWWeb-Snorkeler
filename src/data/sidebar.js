
/*

	TODO NOTES:
	
	- when clicked on CSS/JS show gutter widget but nfo says:
	"this is javasript, helpful info on this will be coming in one of the next updates ;)"


	______________________________________________
    [ info ][ snippets ][ tools ]
    / index.html \/ styles.css \/ scripts.js \ >>
    ______________________________________________

    info:
    	- latest news on critical courseware
    	- links to site sub-pages ( video list, lingo page, references pages, etc. )
    		* maybe video list is catered to page if page is lesson page
    	- cred / url
    snippets
    	- drag && drop code snippets
    	( change based on which language the current tab is in )
    tools
    	[selector]
    	- same as firefox "pick an element from the page" tool
    	- color picker?
    	( maybe like firefox distance from 0,0 is charted + outerWidth/Height )
    	( maybe selector also creates a modal w/xtra info on that area? css info? )
    	( ie. links to re:videos && element/attribute info? )

   	------------------------------------------------
   	custom for lesson pages

   	>> tutorial video w/controls

   	>> video errors that interrupt tutorial video && return where last left off??? 
   	( point to <tag> text overlay, rather than speaking it )

	>> firendlyErrors: true ( via window.location? )

   	>> "hurray u made ur first mistake"
	let's make sure that only shows up once ( persistent memory in plugin? )

	
*/


// ---------------------------------------------------------------------
// editor stuff --------------------------------------------------------
// ---------------------------------------------------------------------


// create an html editor 
// w/custom modalCSS, so that it plays nice in sidebar
var edtr = new WWWEditor({
	id: "playGnd-editor",
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
	addon.port.emit('update',value);
};


// let index know that editor is in focus
// so that it lets Selector know to close itself
edtr.editor.on('focus',function(){
	addon.port.emit('editor-focus');
});

// receive DOM of current tab from index.js
// add that DOM's code to editor 
addon.port.on('passDOM',function( doc ){
	if( doc.doctype ) edtr.editor.setValue( doc.doctype + "\n" + doc.html );
	else edtr.editor.setValue( doc.html );
	edtr.uiTip = true;
	edtr.firstError = true;
	edtr.firstMessage = true;	
	// account for "top" offset
	document.getElementById('playGnd-editor').style.height = window.innerHeight - 35 + "px";
});

// receive new selected target from index ( who got it from Selector )
addon.port.on('new-target',function( targ ){
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
		addon.port.emit('unselectable');
	}
});


// receive new html string for targetLine from index via Selector
addon.port.on('selector-editing',function(htmlstr){
	if( edtr.editor.somethingSelected() ){
		edtr.editor.replaceSelection(htmlstr);	
	}
});

// receive unlock element selector message from index
// ...when it receives it from Selector
addon.port.on('unlock-element-selector',function(){
	document.getElementById('selector').className = "sub-item";
});

// receive update message from index
// ...when it receives it from Selector
addon.port.on('update-editor',function(){
	edtr.editor.setSelection({line:0,ch:0},{line:0,ch:0});
	edtr.update();
});



// ---------------------------------------------------------------------
// menu stuff ----------------------------------------------------------
// ---------------------------------------------------------------------

function eID( id ){ return document.getElementById( id ); }

function showingSub(){
	if(
		eID('nfo-pane').style.display == "block" ||
		eID('snippets-submenu').style.display == "block" ||
		eID('tools-submenu').style.display == "block"		
		) return true;
	else return false;
}

function showSub( item ){
	var l = eID(item).offsetLeft;
	var r = l + 95; // .sub: padding=20px + width=75px
	l = (r>innerWidth) ? innerWidth-95 : l;
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
	else if(e.target.id=="nfo"){
		hideSub();
		eID('nfo-pane').style.display = "block";
	}
	else if(e.target.id=="nfo-close"){
		hideSub('nfo-pane');
	}
	else if(e.target.id=="selector" && e.target.className=="sub-item"){
		hideSub();
		e.target.className = "sub-item-locked"
		addon.port.emit('show-selector');
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
