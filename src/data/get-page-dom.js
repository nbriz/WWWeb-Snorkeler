
// create doctype string
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


var data = {
	location: document.location,
	doctype: dtStr,
	html: outerHTML
}

// let index.js know what the DOM for new page is
// used to load into the editor 
self.port.emit("newDOM", data );