// This module handles canvas operations
const pubsub = require('./pubsub.js');

const myCanvas = (() => {
  // Get the canvas element from html
  const canvas = document.getElementById('canvas');

  // Set context to use properties
  const context = canvas.getContext('2d');

  // set canvas width and height to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Initialize mouse pointer and brush size
  let down = false;
  let bs = 15;

  // e is the event passed
  const drawPoint = (e) => {
    // If the mouse button is pressed
    if (down === true) {
      // Draw a line to this point from whereever the canvas point was previously
      context.lineTo(e.clientX, e.clientY);
      context.lineWidth = bs * 2;
      context.stroke();

      // Create a point
      context.beginPath();
      context.arc(e.clientX, e.clientY, bs, 0, 2 * Math.PI);

      // Fill the point
      context.fill();

      // Send the canvas context to the new point
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    }
  };

  const mouseup = () => {
    // If mouse was clicked
    if (down === true) {
      // Unclick it
      down = false;

      // Refresh the context path
      context.beginPath();
    }
  };

  const mousedown = (e) => {
    // If mouse was not clicked
    if (down === false) {
      // Click it
      down = true;

      // Draw the point
      drawPoint(e);
    }
  };

  // Set listeners
  canvas.addEventListener('mousedown', mousedown);
  canvas.addEventListener('mousemove', drawPoint);

  // Mouse up from entire document should unclick
  document.addEventListener('mouseup', mouseup);

  // Function to set brush size
  const setBrush = (size) => {
    bs = size;
  };

  // Function to set color
  const setcolor = (color) => {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = color;
    context.strokeStyle = color;
  };

  // Function to clear canvas
  const clrcan = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const erase = () => {
    context.globalCompositeOperation = 'destination-out';
    context.strokeStyle = 'rgba(0,0,0,0)';
  };

  // Subscribe to canvas events that anyone can order
  pubsub.on('clearCanvas', clrcan);
  pubsub.on('changeBrush', setBrush);
  pubsub.on('setColor', setcolor);
  pubsub.on('erase', erase);

  // Export the canvas object to access from outside
  return {
    canvas,
  };
})();
module.exports = myCanvas;
