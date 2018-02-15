// This module handles the operatons of paint brush like change size and show in HTML
var brushTool = ( () => {

	// Get the brush tool element
	var brushTool = toolbar.getToolbar().getElementsByClassName('brush')[0];

	// Initialize brush size and minimum and maximum size constants
	var brushSize = 15;
	var maxbs = 50,minbs = 0.5;

	var setBrushSize = newbs => {

		// If new brush size is in between min and max the set it else set min or max based on condition
		if(newbs < minbs) brushSize=minbs;
		else if(newbs > maxbs) brushSize=maxbs;
		else brushSize = newbs;

		// Publish that brush size has changed
		pubsub.emit('changeBrush', brushSize);

		// Render the brush size element in html
		render();
	}

	// Function to decrease brush size
	var decreaseBrushSize = () => {

		// New brush size
		setBrushSize( brushSize-2 );
	}

	// Function to increse brush size
	var increaseBrushSize = () => {

		// New brush size
		setBrushSize( brushSize+2 );
	}

	// This function paints our javascript (hypothetical) brush tool to HTML page
	var render = () => {

		// Remove previous listeners to prevent memory leak
		if( brushTool.getElementsByClassName('bsb').length > 0) {
			(brushTool.getElementsByClassName('dec')[0]).addEventListener('click', decreaseBrushSize);
			(brushTool.getElementsByClassName('inc')[0]).addEventListener('click', increaseBrushSize);
		}

		// Clear the brush tool
		brushTool.innerHTML = "";

		// Fill the brush tool
		brushTool.innerHTML += `<p class="text">Brush Size <span id="bsize">`
								+brushSize+`
								</span></p><div id="dec" class="bsb dec">-</div>
								<div id="inc" class="bsb inc">+</div>`;
		
		// Add listeners
		(brushTool.getElementsByClassName('dec')[0]).addEventListener('click', decreaseBrushSize);
		(brushTool.getElementsByClassName('inc')[0]).addEventListener('click', increaseBrushSize);

	} 

	// Render the brush tool initially
	render();

})();