
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


// var attr = document.getElementsByTagName('html')[0].attributes;
//  	attr = (attr.length>0) ? attr.toString() : '>';
//  	attr = (attr!==">") ? attr.replace(/,/g, " ") : '>';
// var html = "<html" + attr;

var data = {
	doctype: dtStr,
	html: document.documentElement.outerHTML
}

// let index.js know what the DOM for new page is
// used to load into the editor 
self.port.emit("newDOM", data );