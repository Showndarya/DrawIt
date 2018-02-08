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

	// load all the div as an array
	var shade = document.getElementsByClassName("shade");
	var n = shade.length;

	// load clear, erase and save div
	var clear = document.getElementById("clear");
	var erase = document.getElementById("erase");
	var save = document.getElementById("save");

	// e is the event passed 
	var drawPoint = function(e){
		// if mouse button is clicked
		if(down == true){
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
		if(down == true){
			// mouse button is unclicked
			down=false;

			// clear previous path by starting new path
			context.beginPath();
		}
		else{
			// mouse button is clicked
			down = true;

			// draw point on the click
			drawPoint(e);
		}
	}

	// add mouse movement listeners 
	canvas.addEventListener('mousedown',upordown);
	canvas.addEventListener('mousemove',drawPoint);
	canvas.addEventListener('mouseup',upordown);

	// decrese brush size by half
	var decbs = function(){

		var newbs = bs-5;

		if(newbs < minbs) bs=minbs;
		else if(newbs > maxbs) bs=maxbs;
		else bs = newbs;

		//// set the changed radius in toolbar
		setbs.innerHTML = bs;
	}

	// increase brush size twice
	var incbs = function(){

		var newbs = bs+5;
		
		if(newbs < minbs) bs=minbs;
		else if(newbs > maxbs) bs=maxbs;
		else bs = newbs;

		// set the changed radius in toolbar
		setbs.innerHTML = bs;
	}

	// add click listeners to increase and decrease div
	inc.addEventListener('click', incbs);
	dec.addEventListener('click', decbs);

	var setcolor = function(e){		
		// get div clicked by obtaining the element which triggered the event with e.target
		var color = e.target;

		// change fill and stroke color
		context.fillStyle = color.style.backgroundColor;
		context.strokeStyle = color.style.backgroundColor;

		// change the previous color class from active to just shade
		var chkact = document.getElementsByClassName("active")[0];
		if(chkact) chkact.className = 'shade';

		// set current color active
		color.className += ' active';
	}

	// add click listeners to the divs 
	for(var i=0;i<n;i++){
		shade[i].addEventListener('click',setcolor);
	}


	// clear the entire canvas
	var clrcan = function(e){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	clear.addEventListener('click',clrcan);

	// erase parts of canvas
	var eracan = function(e){
		context.fillStyle = "#fff";
		context.strokeStyle = "#fff";
	}
	
	erase.addEventListener('click',eracan);

	// save canvas drawing as .png
	var savecan = function(e){
		e.target.href = canvas.toDataURL();
		e.target.download =  "myDrawIt.png"; 
	}

	save.addEventListener('click',savecan);
	
}();
