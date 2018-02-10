// This module handles canvas operations
var myCanvas = ( () => {

	// Get the canvas element from html
	var canvas = document.getElementById("canvas");

	// Set context to use properties
	var context = canvas.getContext("2d");

	// set canvas width and height to window size
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	// Initialize mouse pointer and brush size
	var down = false;
	var bs = 15;

	// e is the event passed
	var drawPoint = e => {

		// If the mouse button is pressed
		if(down == true) {

			//Draw a line to this point from whereever the canvas point was previously
			context.lineTo(e.clientX, e.clientY);
			context.lineWidth = bs*2;
			context.stroke();

			// Create a point
			context.beginPath();
			context.arc(e.clientX, e.clientY, bs, 0, 2*Math.PI);

			// Fill the point
			context.fill();

			// Send the canvas context to the new point
			context.beginPath();
			context.moveTo(e.clientX, e.clientY);
		}
	}

	var mouseup = e => {

		// If mouse was clicked
		if(down == true) {

			// Unclick it
			down=false;

			// Refresh the context path
			context.beginPath();
		}
	}

	var mousedown = e => {

		// If mouse was not clicked
		if(down == false) {

			// Click it
			down = true;

			// Draw the point
			drawPoint(e);
		}
	}

	// Set listeners
	canvas.addEventListener('mousedown',mousedown);
	canvas.addEventListener('mousemove',drawPoint);

	// Mouse up from entire document should unclick
	document.addEventListener('mouseup',mouseup);

	// Function to set brush size
	var setBrush = size => {
		bs = size;
	}

	// Function to set color
	var setcolor = color => {
		context.fillStyle = color;
		context.strokeStyle = color;
	}

	// Function to clear canvas
	var clrcan = () => {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	// Subscribe to canvas events that anyone can order
	pubsub.on('clearCanvas', clrcan);
	pubsub.on('changeBrush', setBrush);
	pubsub.on('setColor', setcolor);

	// Export the canvas object to access from outside
	return {
		canvas: canvas
	}

})();