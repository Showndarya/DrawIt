var draw = (function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

	var down = false;

	var drawPoint = function(e)
	{
		if(this.down == true)
		{
			context.beginPath();
			context.arc(e.clientX, e.clientY, 10,0,2*Math.PI);
			context.fill();
		}
	}

	var upordown = function(e)
	{
		if(this.down == true) this.down=false;
		else 
		{
			this.down = true;
			drawPoint(e);
		}
	}

	canvas.addEventListener('mousedown',upordown);
	canvas.addEventListener('mousemove',drawPoint);
	canvas.addEventListener('mouseup',upordown);

})()
