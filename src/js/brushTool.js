// This module handles the operatons of paint brush like change size and show in HTML
const toolbar = require('./toolbar.js');
const pubsub = require('./pubsub.js');

const brushTool = (() => {
  // Get the brush tool element
  const brushToolElement = toolbar.getToolbar().getElementsByClassName('brush')[0];

  // Initialize brush size and minimum and maximum size constants
  let brushSize = 15;
  const maxbs = 50;
  const minbs = 0.5;
  let render;

  const setBrushSize = (newbs) => {
    // If new brush size is in between min and max the set it else set min or max based on condition
    if (newbs < minbs) brushSize = minbs;
    else if (newbs > maxbs) brushSize = maxbs;
    else brushSize = newbs;

    // Publish that brush size has changed
    pubsub.emit('changeBrush', brushSize);

    // Render the brush size element in html
    render();
  };

  // Function to decrease brush size
  const decreaseBrushSize = () => {
    // New brush size
    setBrushSize(brushSize - 2);
  };

  // Function to increse brush size
  const increaseBrushSize = () => {
    // New brush size
    setBrushSize(brushSize + 2);
  };

  // This function paints our javascript (hypothetical) brush tool to HTML page
  render = () => {
    // Remove previous listeners to prevent memory leak
    if (brushToolElement.getElementsByClassName('bsb').length > 0) {
      (brushToolElement.getElementsByClassName('dec')[0]).addEventListener('click', decreaseBrushSize);
      (brushToolElement.getElementsByClassName('inc')[0]).addEventListener('click', increaseBrushSize);
    }

    // Clear the brush tool
    brushToolElement.innerHTML = '';

    // Fill the brush tool
    brushToolElement.innerHTML += `<p class="text">Brush Size <span id="bsize">${brushSize}</span></p><div id="dec" class="bsb dec">-</div><div id="inc" class="bsb inc">+</div>`;

    // Add listeners
    (brushToolElement.getElementsByClassName('dec')[0]).addEventListener('click', decreaseBrushSize);
    (brushToolElement.getElementsByClassName('inc')[0]).addEventListener('click', increaseBrushSize);
  };

  // Render the brush tool initially
  render();
})();
module.exports = brushTool;
