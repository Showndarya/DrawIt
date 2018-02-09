var misc = ( () => {

	var clear = toolbar.getToolbar().childNodes[7];

	clear.addEventListener('click', (e) => {
		pubsub.emit('clearCanvas');
	});

	var erase = toolbar.getToolbar().childNodes[9];

	erase.addEventListener('click', (e) => {
		pubsub.emit('setColor', '#fff');
	});

	var save = toolbar.getToolbar().childNodes[11];

	save.addEventListener('click', (e) => {
		e.target.href = myCanvas.canvas.toDataURL();
		e.target.download =  "myDrawIt.png";
	});

})();