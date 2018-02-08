var draw = (function(){

	// get canvas element
	var canvas = document.getElementById("canvas");

	// set context to use properties
	var context = canvas.getContext("2d");

	// set canvas width and height to window size
	canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // check if mouse button is pressed
	var down = false;

	// e is the event passed 
	var drawPoint = function(e)
	{
		// if mouse button is clicked
		if(this.down == true)
		{
			//connect current point with previous point
			context.lineTo(e.clientX, e.clientY);
			context.lineWidth = 20;
			context.stroke();

			// create point
			context.beginPath();
			context.arc(e.clientX, e.clientY, 10,0,2*Math.PI);

			// fill the point
			context.fill();

			// connect this point to next point
			context.beginPath();
			context.moveTo(e.clientX, e.clientY);
		}
	}

	var upordown = function(e)
	{
		if(this.down == true) 
		{
			// mouse button is unclicked
			this.down=false;

			// clear previous path by starting new path
			context.beginPath();
		}
		else 
		{
			// mouse button is clicked
			this.down = true;
			
			// draw point on the click
			drawPoint(e);
		}
	}

	canvas.addEventListener('mousedown',upordown);
	canvas.addEventListener('mousemove',drawPoint);
	canvas.addEventListener('mouseup',upordown);

})()
