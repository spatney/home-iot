let Xbee = require('./xbee');
let xbee = Xbee();

class Garage {
    constructor(deviceId) {
        this.deviceId = deviceId || 3;
    }

    toggle() {
        xbee.send(this.deviceId, 1);
    }
}

module.exports = Garage;