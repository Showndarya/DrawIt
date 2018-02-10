// This module serves as a mediator for all events
var pubsub = {

	// An event subscribes
	on: (eventName, func) => {

		// If events is not defined, define it
		if(!this.events)
			this.events = {};

		//Add the function to event's list
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(func);
	},

	// An event unsubscribes
	off: (eventName, func) => {

		//If there is an event loop in its list and find the function and remove it
		if(this.events[eventName])
			for( var index in this.events[eventName] )
				if(this.events[eventName][index] === func) {
					this.events[eventName].splice(index, 1);
					break;
				}
	},

	// An event is published
	emit: (eventName, data) => {

		// If event is present loop through it and execute the functions on its list with the data.
		if(this.events[eventName])
			this.events[eventName].forEach( func => {
				func(data);
			});
	}
}