// This module handles events on color pallete
var colorPallete = ( () => {

	// Get color pallete element from toolbar
	var colorPallete = toolbar.getToolbar().getElementsByClassName('color')[0];


	// Initialize list of available colors
	var colors = ["#000", "#fff", "#99c2ff", "#ff6666", "#99ff99", "#ffff80", "#dea562"];

	// This function sets listeners on all color elements
	var setListeners = () => {

		// Get all the color elements
		var shades = colorPallete.getElementsByClassName('shade');
		for(var i = 0; i < shades.length; i++) {

			// Set listener on each element
			shades[i].addEventListener('click', event => {

				// Remove class from previous active element
				colorPallete.getElementsByClassName('active')[0].classList.remove('active');

				// Add active class to clicked element
				event.target.classList.add('active');

				// Publish setColor event with background color of the clicked button
				pubsub.emit('setColor', event.target.style.backgroundColor);
			});
		}
	}

	// This function renders our color elements to HTML
	var render = () => {

		// Clear color pallete
		colorPallete.innerHTML = "";

		// Loop through the list of colors and add their HTML
		for( var i in colors ) {
			colorPallete.innerHTML += '<div class="shade" style="background-color: '+colors[i]+';"></div>';
		}

		// Set active class on first element
		colorPallete.querySelector('.shade').classList.add('active');
	}

	// Render the elements
	render();

	// Set Listeners
	setListeners();

})();