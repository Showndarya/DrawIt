// This module exports the toolbar element
const toolbar = (() => {
  // Get the toolbar element
  const toolbarElement = document.getElementById('toolbar');

  // This function returns toolbar element
  const getToolbar = () => toolbarElement;

  // Export the getter for toolbar inside an object to acess from outside
  return {
    getToolbar,
  };
})();

module.exports = toolbar;
