var draw = (function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

	var width = canvas.innerWidth;
	var height = canvas.innerHeight;

	var drawPoint = function(e)
	{
		context.beginPath();
		context.arc(e.offsetX, e.offsetY, 10,0,2*Math.PI);
		context.fill();
	}

	canvas.addEventListener('mousedown',drawPoint);

})()
