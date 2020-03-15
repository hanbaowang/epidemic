const events = require('events');
const { pub } = require('./pub')

class Bus {
    constructor() {
        this.events = []
    }

    getEvents() {
        return this.events;
    }

    // id: string
    addEvent(id) {
        this.events.push(id);
        return true;
    }

    newEvent(id, result) {
        if (this.events.indexOf(id) === -1) {
            return false
        }
        pub(id, result)
    }
}

const bus = new Bus();

module.exports = {
    bus
}