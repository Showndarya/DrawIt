// This module handles miscellaneous events such as clear canvas, erase and save
const toolbar = require('./toolbar.js');
const pubsub = require('./pubsub.js');
const myCanvas = require('./canvas.js');

(() => {
  // Get clear element from toolbar
  const clear = toolbar.getToolbar().getElementsByClassName('clear')[0];

  // Add event listener
  clear.addEventListener('click', () => {
    // Publish clearCanvas event
    pubsub.emit('clearCanvas');
  });

  // Get erase element from toolbar
  const erase = toolbar.getToolbar().getElementsByClassName('erase')[0];

  // Add event listener
  erase.addEventListener('click', () => {
    // Publish erase event
    pubsub.emit('erase');
  });

  // Get save element from toolbar
  const save = toolbar.getToolbar().getElementsByClassName('save')[0];

  // Add event listener
  save.addEventListener('click', (e) => {
    // Set the clicked elements href to canvas data
    e.target.href = myCanvas.canvas.toDataURL();

    // Name the downloaded file
    e.target.download = 'myDrawIt.png';
  });
})();
