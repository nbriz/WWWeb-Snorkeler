// let index know what starting height is
self.port.emit("pageHeight", innerHeight );

// add listener to let index know subsequent height changes
window.addEventListener('resize',function(){
	self.port.emit("pageHeight", innerHeight );
});