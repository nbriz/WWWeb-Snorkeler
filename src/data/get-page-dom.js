
/* ........................ ON HOLD FOR NOW ........................


// ---------------------------------------------------------------- check for js && css files
var cssfiles = [];
var jsfiles = [];

function getSubStrIndexes( str, sub ){
	var n = str.split(sub).length-1;
	var indexes = [];
	for (var i = 1; i <= n; i++) {
		indexes.push( str.split(sub,i).join(sub).length );
	}
	return indexes;
}

function getAbsolutePath( ele, type ){
	var attr = (type=="css") ? "href" : "src";
	if( ele.getAttribute(attr).indexOf('.')>0){
		var parts = ele.getAttribute(attr).split('.');
		if( parts[parts.length-1]==type ) {
			var path = ele.getAttribute(attr);
			var http = document.location.protocol;
			var host = document.location.host;
			var pathname = document.location.pathname;
			
			if( path.indexOf('http')==0 ){ // regular absolute path
				
				return {
					url: path,
					path: path 
				};
			
			} else if( path.indexOf('//')==0 ){ // absolute path
				
				return {
					url: http+path,
					path: path 
				};
			
			} else if( path.indexOf("/")==0 ){ // root of current host
				
				return {
					url: http +"//"+ host + path,
					path: path 
				};
			
			} else if( path.indexOf("../")==0){ // nav'ing bax				
				var c = path.match(/\.\.\//g); 
				var s = pathname.match(/\//g);
				var r = getIndexes( pathname, '/' ).reverse();
				var subIdx = (r[c.length]==0) ? 1 : r[c.length];
				var end = path.split('../')[ path.split('../').length-1 ];
				return {
					url: http +"//"+ host + pathname.substr(0,subIdx) + "/" + end,
					path: path 
				};
			
			} else if( path.indexOf("./")==0){ // relative path
				var end = path.substr(1,path.length);
				var mid = pathname;
				var r = getIndexes( mid, '/' ).reverse();
				if( mid.indexOf('.')>0) mid = mid.substr(0,r[0]);
				return {
					url: http +"//"+ host + mid + end,
					path: path 
				};

			} else { // regular relative path
				var mid = pathname;
				if( mid[mid.length-1]!=="/") mid = mid + "/";
				return {
					url: http + "//" + host + mid + path,
					path: path 
				};
			}
			// return ele.getAttribute(attr);
		}
	}
}

var headKids = document.head.children;
for (var i = 0; i < headKids.length; i++) {
	var ele = headKids[i];
	if( ele.nodeName=="LINK" && ele.getAttribute('href') ){
	
		var path = getAbsolutePath( ele, "css" );
		if( path ) cssfiles.push( path );
	
	} else if( ele.nodeName=="SCRIPT" && ele.getAttribute('src') ){
		
		var path = getAbsolutePath( ele, "js" );
		if( path ) jsfiles.push( path );		
	
	}
}

var bodyKids = document.body.children;
for (var i = 0; i < bodyKids.length; i++) {
	var ele = bodyKids[i];
	if( ele.nodeName=="SCRIPT" && ele.getAttribute('src') ){
		
		var path = getAbsolutePath( ele, "js" );
		if( path ) jsfiles.push( path );		
	
	}
}

*/

// ---------------------------------------------------------------- create doctype string
var dtStr;
if( document.doctype ){
 	dtStr = "<!DOCTYPE "
	+ document.doctype.name
	+ (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '')
	+ (!document.doctype.publicId && document.doctype.systemId ? ' SYSTEM' : '') 
	+ (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : '')
	+ '>'; // via: http://stackoverflow.com/a/10162353/1104148
} else {
	dtStr = null;
}

var outerHTML = document.documentElement.outerHTML;
	outerHTML = outerHTML.replace('<head>','\n\t<head>');
	outerHTML = outerHTML.replace('</body>','\t</body>\n');



// ---------------------------------------------------------------- emit data bax to index

var data = {
	location: document.location,
	// cssfiles: cssfiles,
	// jsfiles: jsfiles,
	doctype: dtStr,
	html: outerHTML
}

// let index.js know what the DOM for new page is
// used to load into the editor 
self.port.emit("newDOM", data );