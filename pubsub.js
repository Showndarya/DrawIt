var pubsub = {

	on: (eventName, func) => {
		if(!this.events)
			this.events = {};
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(func);
	},

	off: (eventName, func) => {
		if(this.events[eventName])
			for( var index in this.events[eventName] )
				if(this.events[eventName][index] === func) {
					this.events[eventName].splice(index, 1);
					break;
				}
	},

	emit: (eventName, data) => {
		if(this.events[eventName])
			this.events[eventName].forEach( func => {
				func(data);
			});
	}
}