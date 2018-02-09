var colorPallete = ( () => {

	var colorPallete = toolbar.getToolbar().childNodes[5];

	var colors = ["#000", "#fff", "#99c2ff", "#ff6666", "#99ff99", "#ffff80", "#dea562"];

	var setListeners = () => {
		var shades = colorPallete.getElementsByClassName('shade');
		for(var i = 0; i < shades.length; i++) {
			shades[i].addEventListener('click', event => {
				colorPallete.getElementsByClassName('active')[0].classList.remove('active');
				event.target.classList.add('active');
				pubsub.emit('setColor', event.target.style.backgroundColor);
			});
		}
	}

	var render = () => {
		colorPallete.innerHTML = "";
		for( var i in colors ) {
			colorPallete.innerHTML += '<div class="shade" style="background-color: '+colors[i]+';"></div>';
		}
		colorPallete.querySelector('.shade').classList.add('active');
	}

	render();
	setListeners();

})();