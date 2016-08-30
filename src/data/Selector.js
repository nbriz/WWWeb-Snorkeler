function Selector( element ){
	var selfie = this;
	if( !(element instanceof HTMLElement) )
		throw new Error('Selector: expecting an instanceof HTMLElement');
	
	this.element = element;
	this.targeting = true;
	this.element.style.cursor = "crosshair";
	this._makeCssDict(); // creates this.CssDict
	this.scrollTimer; // incase we need to scroll before targeting nfo


	// overlays
	this.curtain = document.createElement('divydiv'); // cover the page w/gap over selection

	// information parent element
	this.nfo = this._newDiv({
		fontFamily: 'inconsolata',
		color: "#fff",
		fontWeight: "300",
		position: "fixed",
		zIndex: "99999999999999",
		textAlign: 'right',
		fontSize: '16px',
		fontWeight: '300'
	});

	// source sub-section ( header && content )
	this.sourceH = this._newDiv({
		borderTop: "1px solid #a6da27",
		paddingTop: "5px",
		margin: "10px 0px",
		color: "#a6da27",
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '300'		
	});
	// this._overUpdate( this.sourceH, 'source code' );
	this.source = this._newDiv({
		textAlign: 'right',
		border: "1px solid rgba(255,255,255,0.5)"
	});
	this.sourceBtn = this._newDiv({
		display: 'inline-block',	
		color: "rgba(166, 218, 38, 1)",
		cursor: "pointer",
		textAlign: "left"
	});	
	this.sourceBtn.innerHTML = "✓ [update source code]";
	this.sourceBtn.onclick = function(){
		self.port.emit('selector-editing', selfie.editTarg.innerHTML );
		selfie._rmvOverlay(true);
	}
	this._overUpdate( this.sourceH, this.sourceBtn );
	this.sourceTitle = this._newDiv({
		color: "#a6da27",
		float: 'right',
		fontSize: '16px',
		fontWeight: '300',
		display: 'inline-block'
	});
	this.sourceTitle.innerHTML = "source code";
	this._overUpdate( this.sourceH, this.sourceTitle );


	this.editTarg; // temporary frame for this.edtr content

	// html sub-section ( header && content )
	this.htmlH = this._newDiv({
		borderTop: "1px solid #a6da27",
		paddingTop: "5px",
		margin: "10px 0px",
		color: "#a6da27",
		textAlign: 'right',
		fontSize: '16px',
		fontWeight: '300',
		cursor: "pointer"		
	});
	this._overUpdate( this.htmlH, 'show html info' );
	this.htmlinfo = this._newDiv({
		textAlign: 'left',
		color: 'white',
		fontFamily: 'inconsolata',
		fontSize: '16px',
		fontWeight: '300'		
	});
	
	// source sub-section ( header && content )
	this.cssH = this._newDiv({
		borderTop: "1px solid #a6da27",
		paddingTop: "5px",
		margin: "10px 0px",
		color: "#a6da27",
		textAlign: 'right',
		fontSize: '16px',
		fontWeight: '300',
		cursor: 'pointer'			
	});	
	this._overUpdate( this.cssH, 'show css info' );
	this.cssinfo = this._newDiv({
		textAlign: 'left',
		fontSize: '16px',
		fontWeight: '300'		
	});
	
	self.port.on('editor-focus',function(){
		selfie._rmvOverlay(true);
	});

	self.port.on('unselectable',function(){
		selfie.sourceBtn.style.color = "rgba(166, 218, 38, 1)";
		selfie.sourceBtn.onclick = function(){
			alert('woops, couldn\'t find the selection in the editor, so it can\'t be saved, sorry :(');
		}
	});

	document.body.addEventListener('click',function(e){
		selfie._doIt(e);
	});

	window.addEventListener('resize',function(){
		selfie._resize();
	});	
};


//-------------------------------------------------------------------------------------------------------------------
// OVERLAY DOM METHODS
//-------------------------------------------------------------------------------------------------------------------

Selector.prototype._resize = function() {
	this._rmvOverlay(true);
	self.port.emit('update-editor');
};

Selector.prototype._newDiv = function( css ) {
	// create overlay divydiv elements w/CSS
	var ele = document.createElement('divydiv');
	// normalize divydiv
	ele.style.display = "block";
	ele.style.margin = 0;
	ele.style.padding = 0;
	ele.style.border = 0;
	// apply custom css
	for ( key in css ) ele.style[key] = css[key];
	return ele;
};

Selector.prototype._overUpdate = function( ele, content ) {
	// update overlay divydiv element's content
	if( typeof content == "string" ) ele.innerHTML = content;
	else ele.appendChild( content );
};

Selector.prototype._limitScroll = function() {
	var self = this;
	var y = document.documentElement.scrollTop;
	var cap = parseFloat(self.nfo.style.top);

	// make sure there's plenty of curtain cover below to scroll
	var top = self.curtain.children[0];
	var bottom = self.curtain.children[1];
	var left = self.curtain.children[2];
	var bHeight = parseFloat(bottom.style.height);
	var distTop = top.offsetHeight + left.offsetHeight;
	bottom.style.height = bHeight+distTop+15+"px";
	

	function limiter(e){
		if( e.pageY > y && parseFloat(self.nfo.style.top)>0 ){ // scroll down

			var diff = (e.pageY-y);
			self.nfo.style.top = (parseFloat(self.nfo.style.top)-diff)+"px";
			for (var i = 0; i < self.curtain.children.length; i++) {
				var c = self.curtain.children[i];
				c.style.top = (parseFloat(c.style.top)-diff)+"px";
			}
			y = document.documentElement.scrollTop;

		} else if(e.pageY < y && parseFloat(self.nfo.style.top)<cap) { // scroll up

			var diff = (y-e.pageY);
			self.nfo.style.top = (parseFloat(self.nfo.style.top)+diff)+"px";
			for (var i = 0; i < self.curtain.children.length; i++) {
				var c = self.curtain.children[i];
				c.style.top = (parseFloat(c.style.top)+diff)+"px";
			}
			y = document.documentElement.scrollTop;			
		} else {
			e.preventDefault();
			e.stopPropagation();
			document.documentElement.scrollTop = y;
		}
	}

	// window.addEventListener('scroll', limiter );
	window.onscroll = limiter;
};

Selector.prototype._resetScroll = function() {
	// window.removeEventListener('scroll', limiter);
	if( window.onscroll ) window.onscroll = null;
};

Selector.prototype._rmvOverlay = function( fromX ) {
	var nfoKids = [];
	var curKids = [];
	// clear css info...
	this.cssinfo.innerHTML = "";
	// remove editor && editing frame from source
	this.source.removeChild( document.getElementsByClassName('CodeMirror')[0] );
	if( typeof this.editTarg!=="undefined"){		
		this.editTarg.outerHTML = this.editTarg.innerHTML // not workign?????????
	}
	// clone children arrays
	for (var i = 0; i < this.nfo.children.length; i++) 
		nfoKids.push( this.nfo.children[i] );
	for (var i = 0; i < this.curtain.children.length; i++) 
		curKids.push( this.curtain.children[i] );	
	// remove children from parents
	for (var i = 0; i < nfoKids.length; i++) 
		this.nfo.removeChild( nfoKids[i] );
	for (var i = 0; i < curKids.length; i++) 
		this.curtain.removeChild( curKids[i] );
	// remove parents
	this.element.removeChild( this.curtain );
	this.element.removeChild( this.nfo );
	// allow scrolling again
	this._resetScroll();
	if( typeof this.editTarg!=="undefined"){		
		this.editTarg = undefined;	
	}
	if( fromX ){
		// let index know to let sidebar know to unlock selector menu item
		self.port.emit('unlock-element-selector');		
	}
};

Selector.prototype._overX = function() {
	// create the x closing button for overlay
	var selfie = this;

	var x = document.createElement('divydiv');
		// x.style.borderTop = "1px solid #F92672";
		x.style.paddingTop = "5px";
		x.style.margin = "10px 0px";
		x.style.color = "#F92672";
		x.style.cursor = "pointer";
		// x.style.textAlign = "right";
		x.style.display = "block";
		x.style.textAlign = "left"
		x.onclick = function(){ 
			selfie._rmvOverlay(true); 
			self.port.emit('update-editor');
		}
		x.innerHTML = "✖ [close html selector]";
	return x;
};

Selector.prototype._curt = function( x, y, w, h  ) {
	// create one of the 4 sides of the curtain
	var c = document.createElement('divydiv');
	c.style.background = "rgba(39, 40, 34, 0.9)";
	c.style.position = "fixed";
	c.style.zIndex = "99999999999999";
	c.style.width = (typeof w=="number") ? w+"px" : w;
	c.style.height = (typeof h=="number") ? h+"px" : h;
	c.style.left = (typeof x=="number") ? x+"px" : x;
	c.style.top = (typeof y=="number") ? y+"px" : y;
	return c;
};

Selector.prototype._findTop = function(targ,total) {
	// find correct top offset for curtain segment
	var tally = total + targ.offsetTop;
	if( targ.offsetParent ){
		return this._findTop( targ.offsetParent, tally );
	} else {
		return tally;
	}
};

Selector.prototype._findLeft = function(targ,total) {
	// find correct left offset for curtain segment
	var tally = total + targ.offsetLeft;
	if( targ.offsetParent ){
		return this._findLeft( targ.offsetParent, tally );
	} else {
		return tally;
	}
};
Selector.prototype._a = function( a  ) {
	// use the right article ( a or an ) before an element name
	var pre = (a[0]=="a"||a[0]=="e"||a[0]=="i"||a[0]=="o"||a[0]=="u"||
		a.indexOf("h1")==0||a.indexOf("h2")==0||a.indexOf("h3")==0||
		a.indexOf("h4")==0||a.indexOf("h5")==0||a.indexOf("h6")==0) ? "an" : "a";
	return pre;
};


//-------------------------------------------------------------------------------------------------------------------
// HTML INFO
//-------------------------------------------------------------------------------------------------------------------

Selector.prototype._makeAttrList = function( htmlstr ){
	
	var self = this;
	// parse out attributes
	var startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
	var attrs = [];
	var m = htmlstr.match(startTag);
	var a = m[2].split(" ");
	a.forEach(function(i){
		if(i.length>0){
			var attr;
			var e = i.indexOf("=");
			if(e>=0) attr = i.substr(0,e);
			else attr = i;
			attrs.push( attr );
		}
	});

	var objArr = [];

	// create entry for each attribute 
	attrs.forEach(function( name ){

		if( attributesDict.hasOwnProperty( name ) ){

			var attrDict = {
				status: attributesDict[name].supported,
				nfo: attributesDict[name].nfo.w3c,
				eles: attributesDict[name].elements
			};
			attrDict.eles = attrDict.eles.toString();			
			attrDict.eles = attrDict.eles.replace(/</g,"&lt;");
			attrDict.eles = attrDict.eles.replace(/>/g,"&gt;");

			var attrName = self._newDiv({				
					paddingTop: "5px",
					margin: "5px 0px",
					color: "#a6da27",
					textAlign: 'left',
					cursor: "pointer"
				});				
			attrName.innerHTML = name;
			
			var attrNfo = self._newDiv({
				marginBottom: "5px",
				overflowY: "hidden",
				transition: "max-height 0.5s ease-out"
			});			

			var cntnt = '';
			if( !attrDict.status ) cntnt += '<span style="color:#F92672">[ depreciated ]</span> ';
			cntnt += attrDict.nfo;
			if( attrDict.eles == "Global attribute" )
			    cntnt += " this is a <b>Global Attribute</b> and can be applied to any element.";
			else
			    cntnt += 'this can only be applied to: <span style="color:#F92672">'+attrDict.eles+"</span>";
			cntnt += ' <a style="color:#dad06f;font-style:italic" href="http://www.w3schools.com/tags/att_'+name+'.asp" target="_blank">(learn more)</a><br><br>';
			
			attrNfo.innerHTML = cntnt;
			
			var obj = {
				name: attrName,
				nfo: attrNfo
			}
			objArr.push( obj );
		} 
	});
	return objArr;
}


Selector.prototype._displayHTML = function( htmlstr, dict) {
	var self = this;

	var div = this._newDiv({
		overflowY: "hidden",
		transition: "max-height 0.5s ease-out"
	});

	// add html element info
	var content = "";
	if( dict.nfo ){		
		content += 'this is '+this._a(dict.word)+' <a href="'+dict.url+'" target="_blank" style="color:#F92672">'+dict.word+'</a> element ';
		if( dict.status.length>0 ) content += '| ['+dict.status+']';
		content += "<br><br>";
		content += dict.nfo+' <a style="color:#dad06f;font-style:italic" href="'+dict.url+'" target="_blank">(learn more)</a>';		
	} else {
		content += 'this is '+this._a(dict.word)+" "+dict.word+" element, i've got no info on this :( search the wwweb for info";
	}
	div.innerHTML = content;

	// add attribute's && their info 
	var attrArr = this._makeAttrList(htmlstr);
	if( attrArr.length > 0 ){
		var pre = this._newDiv({ color:"#fff" });
		pre.innerHTML = '<br>this <span style="color:#F92672">'+dict.word+'</span> element contains the following attributes<br>';
		div.appendChild( pre );
	}
	attrArr.forEach(function(a){
		div.appendChild(a.name);
		div.appendChild(a.nfo);
	});

	// add all this to html info section
	this._overUpdate( this.htmlinfo, div );
	
	// calculate height && make it clickable to reveal info
	var initH = div.offsetHeight+"px";
	div.style.maxHeight = "0px";

	this.htmlH.onclick = function(){ 
		if( div.style.maxHeight == initH){
			div.style.maxHeight = "0px";
			self.htmlH.innerHTML = "show html info";
		}
		else{
			div.style.maxHeight = initH;
			self.htmlH.innerHTML = "hide html info";
		}
	}

};

//-------------------------------------------------------------------------------------------------------------------
// CSS PARSING METHODS
//-------------------------------------------------------------------------------------------------------------------

Selector.prototype._CSSparse = function(styleContent) {
	// via >> http://stackoverflow.com/a/14865690/1104148
    var doc = document.implementation.createHTMLDocument(""),
    	styleElement = document.createElement("style");

	styleElement.textContent = styleContent;
	// the style will only be parsed once it is added to a document
	doc.body.appendChild(styleElement);

	return styleElement.sheet.cssRules;
};

Selector.prototype._styleParse = function(str) {
	var line = str.replace(/\n/g, "");
	 	line = line.replace(/\t/g, "");
		line = line.replace(/;/g,";\n");
	return line;
};

Selector.prototype._makeCssDict = function() {
	var self = this;
	self.CssDict = {};
	var link = document.getElementsByTagName('link');
	var cssOnly = [];
	// create array of link files w/href to css file paths...
	for( var i=0; i<link.length; i++) 
		if(link[i].getAttribute('href').indexOf('.css')>=0)
			cssOnly.push( link[i] );

	// loop through css files...
	cssOnly.forEach(function(link,i){
		var rules = link.sheet.cssRules;
		for (var i = 0; i < rules.length; i++) {
			if( !self.CssDict[ rules[i].selectorText ] )
				self.CssDict[ rules[i].selectorText ] = [];									
			self.CssDict[ rules[i].selectorText ].push( rules[i].cssText );
		}
	});
	// add any css inside of style tags
	var styleTags = document.getElementsByTagName('style');
	for (var i = 0; i < styleTags.length; i++) {
		var rules = styleTags[i].sheet.cssRules;
		for (var i = 0; i < rules.length; i++) {
			if( !self.CssDict[ rules[i].selectorText ] )
				self.CssDict[ rules[i].selectorText ] = [];									
			self.CssDict[ rules[i].selectorText ].push( rules[i].cssText );
		}		
	}
};

Selector.prototype._getCSSNfo = function(targ) {
	var css = {
		tag:[],
		id:[],
		classes:[],
		styles:[]
	};

	// add any element rules
	var tag = targ.tagName.toLowerCase();	
	if( this.CssDict.hasOwnProperty(tag) ){
		if(this.CssDict[tag])
			for (var i = 0; i < this.CssDict[tag].length; i++) 
				css.tag.push( this._styleParse(this.CssDict[tag][i]) );
	}

	// add any id rules
	if( targ.getAttribute('id') ){
		var id = targ.getAttribute('id');
		if( this.CssDict[id] )
			for (var i = 0; i < this.CssDict[id].length; i++) 
				css.id.push( this._styleParse(this.CssDict[id][i]) );
	}

	// add any css class rules
	if( targ.classList.length > 0){
		for (var i = 0; i < targ.classList.length; i++) {
			var className = "."+targ.classList[i];
			if( this.CssDict[className]){
				for (var j = 0; j < this.CssDict[className].length; j++) 
					css.classes.push( this._styleParse(this.CssDict[className][j]) );
			}
		}
	}	

	// add any inline styles
	var style = targ.getAttribute('style');
	if( style ){
		if( style.length > 1 )
			css.styles.push(this._styleParse(style));
	}

	return css;
};

Selector.prototype._parseCSSarr = function( arr, message, style ){
	var l = this._newDiv({				
			paddingTop: "5px",
			margin: "10px 0px",
			color: "#F92672",
			textAlign: 'left',
			cursor: "pointer"
		});				
	l.innerHTML = "show"+message;
	
	var c = this._newDiv({
		borderBottom: "1px solid rgba(255,255,255,0.5)",
		marginBottom: "5px",
		overflowY: "hidden",
		maxHeight: "0px",
		transition: "max-height 0.5s ease-out"
	});
	c.innerHTML = "";

	if( style ){
		//BUG: why are the subsequent properties indented????
		var str = arr[0];
		str = str.replace(/\n/g,"");
		str = str.replace(/;/g, ";<br>");
		c.innerHTML += str + "<br>";
	} else {
		for (var i = 0; i < arr.length; i++) {
			var str = arr[i];
			str = str.replace(/;/g, ";<br> &nbsp;&nbsp;&nbsp;");
			str = str.replace(/{/g, "{<br> &nbsp;&nbsp;&nbsp;");
			str = str.replace(/\n/g,"");
			str = str.replace(/&nbsp;&nbsp;&nbsp; }/g, "}");
			c.innerHTML += str + "<br>";
		}
	}

	
	var re1 = /<br>/gi,  result, indices = [];
	while ( (result = re1.exec(c.innerHTML)) ) indices.push(result.index);
	var initH = (indices.length+1) * 24 + "px";

	l.onclick = function(){ 
		if( c.style.maxHeight == initH){
			c.style.maxHeight = "0px";
			l.innerHTML = "show"+message;
		}
		else{
			c.style.maxHeight = initH;
			l.innerHTML = "hide"+message;
		}
	}

	return { l:l, c:c, h:parseFloat(initH) };
};

Selector.prototype._displayCSS = function(css,element) {
	var self = this;
	var heights = [];
	var totalH = 0;
	var p = this._newDiv({
			overflowY: "hidden",
			transition: "max-height 0.5s ease-out"
		}); 
		p.innerHTML = "the following css rules are effecting this element:<br>";

	if( css.tag.length > 0 ){
		var tag = this._parseCSSarr( css.tag, 
			" "+element+" type selector(s)" );

		p.appendChild( tag.l );
		p.appendChild( tag.c );	
		heights.push( tag.h );
	}
	if( css.id.length > 0 ){
		var id = this._parseCSSarr( css.id, 
			" id selector(s)" );

		p.appendChild( id.l );
		p.appendChild( id.c );
		heights.push( id.h );	
	}
	if( css.classes.length > 0 ){
		var classes = this._parseCSSarr( css.classes, 
			" class selector(s)" );

		p.appendChild( classes.l );
		p.appendChild( classes.c );	
		heights.push( classes.h );
	}
	if( css.styles.length > 0 ){
		var styles = this._parseCSSarr( css.styles, 
			" the inline styles" );

		p.appendChild( styles.l );
		p.appendChild( styles.c );	
		heights.push( styles.h );
	}	

	if( heights.length<1 ) p.innerHTML = "there is no CSS effecting this element";
	else heights.forEach(function(item){ totalH += item; });
	
	this._overUpdate( this.cssinfo, p );	

	var initH = p.offsetHeight+totalH+"px";
	p.style.maxHeight = "0px";
		
	this.cssH.onclick = function(){ 
		if( p.style.maxHeight == initH){
			p.style.maxHeight = "0px";
			self.cssH.innerHTML = "show css info";
		}
		else {
			p.style.maxHeight = initH;
			self.cssH.innerHTML = "hide css info";
		}
	}	
};



//-------------------------------------------------------------------------------------------------------------------
// RENDERING OVERLAY METHODS
//-------------------------------------------------------------------------------------------------------------------


Selector.prototype._showNfo = function( targ, dict, scrolled ) {
	var selfie = this;
	this.currentTarget = targ;

	// make the curtains
	var ot = this._findTop(targ,0) - document.documentElement.scrollTop; 
	var ol = this._findLeft(targ,0) - document.documentElement.scrollLeft;
	var iw = window.innerWidth;
	var ih = window.innerHeight;
	var ow = targ.offsetWidth;
	var oh = targ.offsetHeight;

	var t = this._curt(0,0,'100%',ot);
	var b = this._curt(0,ot+oh,'100%',ih-(ot+oh));
	var l = this._curt(0,ot,ol,oh);
	var r = this._curt(ol+ow,ot,iw-(ol+ow),oh);

	this.curtain.appendChild( t );
	this.curtain.appendChild( b );
	this.curtain.appendChild( l );
	this.curtain.appendChild( r );

	// reposition info parent section
	this.nfo.style.left = ol+"px";
	this.nfo.style.top = ot+oh+"px";
	// this.nfo.style.maxWidth = (iw/2)+"px";	
	this.nfo.style.width = "400px";

	// append all the sub-overlays to nfo
	this.nfo.appendChild( this._overX() );
	this.nfo.appendChild( this.sourceH );
	this.nfo.appendChild( this.source );
	// this.nfo.appendChild( this.sourceBtn );
	this.nfo.appendChild( this.htmlH );
	this.nfo.appendChild( this.htmlinfo );	
	this.nfo.appendChild( this.cssH );
	this.nfo.appendChild( this.cssinfo );	

	// insert curtain && info to main element
	this.element.appendChild( this.curtain );
	this.element.appendChild( this.nfo );


	// SOURCE CODE SECTION ..............
	this.edtr = CodeMirror( this.source, {
		value: targ.outerHTML,
		mode: 'xml',
		lineWrapping: true,
		indentWithTabs: true,
		tabSize: 4,
		indentUnit: 4,
		theme: 'bb-code-styles'		
	});
	this.edtr.on( 'change', function() {
		if( typeof selfie.editTarg=="undefined" ){  
			var fr = document.createElement('span');
			fr.innerHTML = targ.outerHTML;
			selfie.editTarg = fr;
			targ.parentNode.replaceChild( selfie.editTarg, targ );
		}		
		selfie.editTarg.innerHTML = selfie.edtr.getValue();
		// self.port.emit('selector-editing', selfie.editTarg.innerHTML );
	});			
	this.source.children[0].style.height = "auto";


	// HTML INFO SECTION ..............	
	this._displayHTML( targ.outerHTML, dict );

	// CSS INFO SECTION .............. 
	var css = this._getCSSNfo(targ);
	this._displayCSS(css,dict.word);

	// limite scroll to curtain area
	this._limitScroll();	


	// adjust if offscreen
	if( this.nfo.offsetWidth+ol > iw ){	 				// if off right	
		var nudge = iw-(this.nfo.offsetWidth+ol);
			nudge -= 15;
		this.nfo.style.marginLeft = nudge+"px";
	}
	if( this.nfo.offsetHeight+ot > ih && !scrolled ){	// if off bottom
		// remove previous rendering...	
		this._rmvOverlay();
		
		// scroll page up if target is too low
		var fromTop = this._findTop(targ,0) - 20;
		this.scrollTimer = setInterval(function() {
		    document.scrollingElement.scrollTop += 10;
		    if( document.scrollingElement.scrollTop >= fromTop ){
		        clearInterval(selfie.scrollTimer);
		        selfie._showNfo( targ, dict, true );
		    } else if(document.documentElement.offsetHeight == 
		    	document.documentElement.scrollTop+ih){
		    	// if we need to scroll beyond bototm of page
		    	// add a bit of buffer to the page		    	
		    	document.body.style.height = document.body.offsetHeight+10+"px"
		    }
		},1000/60)	;	
	}

};

Selector.prototype._doIt = function(e) {
	if(this.targeting){
		e.preventDefault();
		e.stopPropagation();

		// get html info from dictionary
		var word = e.target.tagName.toLowerCase();
		var nfo, dict;
		if( elementsDict.hasOwnProperty( word ) ){
			nfo = elementsDict[word].nfo;
			nfo = nfo.replace(/</g,"&lt;");
			nfo = nfo.replace(/>/g,"&gt;");
			dict = {
				word: word,
				status: elementsDict[word].status,
				url: elementsDict[word].url,
				nfo: nfo
			}
		} else {
			dict = { word: word, nfo:null }
		}

		this._showNfo( e.target, dict );

		// targeting complete && ready 
		this.targeting = false;
		this.element.style.cursor = "auto";
		
		// let index know who we targetted
		// so it can let sidebar know...
		var data = { html: e.target.outerHTML }
		self.port.emit('new-target', data );
	}
};