// This module handles miscellaneous events such as clear canvas, erase and save
var misc = ( () => {

	// Get clear element from toolbar
	var clear = toolbar.getToolbar().childNodes[7];

	// Add event listener
	clear.addEventListener('click', (e) => {

		// Publish clearCanvas event
		pubsub.emit('clearCanvas');
	});

	// Get erase element from toolbar
	var erase = toolbar.getToolbar().childNodes[9];

	// Add event listener
	erase.addEventListener('click', (e) => {

		// Publish setColor event with white color
		pubsub.emit('setColor', '#fff');
	});

	// Get save element from toolbar
	var save = toolbar.getToolbar().childNodes[11];

	// Add event listener
	save.addEventListener('click', (e) => {

		// Set the clicked elements href to canvas data
		e.target.href = myCanvas.canvas.toDataURL();

		// Name the downloaded file
		e.target.download =  "myDrawIt.png";
	});

})();