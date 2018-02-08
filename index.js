var draw = function(){

	// get canvas element
	var canvas = document.getElementById("canvas");

	// set context to use properties
	var context = canvas.getContext("2d");

	// set canvas width and height to window size
	canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // check if mouse button is pressed
	var down = false;

	// initialize all entities related to brush size 
	var maxbs = 50, 
		minbs = 0.5,  
		setbs = document.getElementById("bsize"), 
		inc = document.getElementById("inc"),
		dec = document.getElementById("dec");
	bs = 15;

	// e is the event passed 
	var drawPoint = function(e){
		// if mouse button is clicked
		if(this.down == true){
			//connect current point with previous point
			context.lineTo(e.clientX, e.clientY);
			context.lineWidth = bs*2;
			context.stroke();

			// create point
			context.beginPath();
			context.arc(e.clientX, e.clientY, bs, 0, 2*Math.PI);

			// fill the point
			context.fill();

			// connect this point to next point
			context.beginPath();
			context.moveTo(e.clientX, e.clientY);
		}
	}

	var upordown = function(e){
		if(this.down == true){
			// mouse button is unclicked
			this.down=false;

			// clear previous path by starting new path
			context.beginPath();
		}
		else{
			// mouse button is clicked
			this.down = true;

			// draw point on the click
			drawPoint(e);
		}
	}

	canvas.addEventListener('mousedown',upordown);
	canvas.addEventListener('mousemove',drawPoint);
	canvas.addEventListener('mouseup',upordown);

	// decrese brush size by half
	var decbs = function(){

		var newbs = bs/2;

		if(newbs < minbs) bs=minbs;
		else if(newbs > maxbs) bs=maxbs;
		else bs = newbs;

		//// set the changed radius in toolbar
		setbs.innerHTML = bs;
	}

	// increase brush size twice
	var incbs = function(){

		var newbs = bs*2;
		
		if(newbs < minbs) bs=minbs;
		else if(newbs > maxbs) bs=maxbs;
		else bs = newbs;

		// set the changed radius in toolbar
		setbs.innerHTML = bs;
	}

	inc.addEventListener('click', incbs);
	dec.addEventListener('click', decbs);

	var setcolor = function(e){
		
		var color = e.target;

		context.fillStyle = color.style.backgroundColor;
		context.strokeStyle = color.style.backgroundColor;

		var chkact = document.getElementsByClassName("active")[0];
		if(chkact) chkact.className = 'shade';


		color.className += ' active';
	}
	var shade = document.getElementsByClassName("shade");
	var n = shade.length;

	for(var i=0;i<n;i++)
	{
		shade[i].addEventListener('click',setcolor);
	}


	
}();
