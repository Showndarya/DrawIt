var myCanvas = ( () => {

	var canvas = document.getElementById("canvas");

	var context = canvas.getContext("2d");

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	var down = false;
	var bs = 15;

	var drawPoint = e => {
		if(down == true){
			context.lineTo(e.clientX, e.clientY);
			context.lineWidth = bs*2;
			context.stroke();

			context.beginPath();
			context.arc(e.clientX, e.clientY, bs, 0, 2*Math.PI);

			context.fill();

			context.beginPath();
			context.moveTo(e.clientX, e.clientY);
		}
	}

	var upordown = e => {
		if(down == true){
			down=false;
			context.beginPath();
		}
		else{
			down = true;
			drawPoint(e);
		}
	}

	canvas.addEventListener('mousedown',upordown);
	canvas.addEventListener('mousemove',drawPoint);
	canvas.addEventListener('mouseup',upordown);

	var setBrush = size => {
		bs = size;
	}

	var setcolor = color => {
		console.log("Color: "+color);
		context.fillStyle = color;
		context.strokeStyle = color;
	}

	var clrcan = () => {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	pubsub.on('clearCanvas', clrcan);
	pubsub.on('changeBrush', setBrush);
	pubsub.on('setColor', setcolor);

	return {
		canvas: canvas
	}

})();