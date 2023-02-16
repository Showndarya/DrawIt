// This module serves as a mediator for all events
const pubsub = {

  // An event subscribes
  on: (eventName, func) => {
    // If events is not defined, define it
    if (!this.events) { this.events = {}; }

    // Add the function to event's list
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(func);
  },

  // An event unsubscribes
  off: (eventName, func) => {
    // If there is an event loop in its list and find the function and remove it
    if (this.events[eventName]) {
      const index = this.events.findIndex(event => event === func);
      this.events[eventName].splice(index, 1);
    }
  },

  // An event is published
  emit: (eventName, data) => {
    // If event is present loop through it and execute the functions on its list with the data.
    if (this.events[eventName]) {
      this.events[eventName].forEach((func) => {
        func(data);
      });
    }
  },
};

module.exports = pubsub;
