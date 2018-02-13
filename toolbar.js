// This module exports the toolbar element
var toolbar = ( () => {

	// Get the toolbar element
	var toolbar = document.getElementById('toolbar');


	// This function returns toolbar element
	var getToolbar = () => {
		return toolbar;
	}

	// Export the getter for toolbar inside an object to acess from outside
	return {
		getToolbar: getToolbar
	}

})();