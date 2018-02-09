var brushTool = ( () => {

	var brushTool = toolbar.getToolbar().childNodes[1];

	var brushSize = 15;
	var maxbs = 50,minbs = 0.5;

	var decreaseBrushSize = () => {

		var newbs = brushSize-2;

		if(newbs < minbs) brushSize=minbs;
		else if(newbs > maxbs) brushSize=maxbs;
		else brushSize = newbs;

		pubsub.emit('changeBrush', brushSize);
		render();
	}

	var increaseBrushSize = () => {

		var newbs = brushSize+2;

		if(newbs < minbs) brushSize=minbs;
		else if(newbs > maxbs) brushSize=maxbs;
		else brushSize = newbs;

		pubsub.emit('changeBrush', brushSize);
		render();
	}

	var render = () => {
		brushTool.innerHTML = "";
		brushTool.innerHTML += 'Brush Size <span id="bsize">'+brushSize+'</span><div id="dec" class="bsb">-</div><div id="inc" class="bsb">+</div>'
		brushTool.childNodes[2].addEventListener('click', decreaseBrushSize);
		brushTool.childNodes[3].addEventListener('click', increaseBrushSize);
	}

	render();

})();