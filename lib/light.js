let Xbee = require('./xbee');
let xbee = new Xbee();

class Light {
    constructor(deviceId) {
        this.deviceId = deviceId || 1;
    }

    on() {
        xbee.send(this.deviceId, 1);
    }

    off() {
        xbee.send(this.deviceId, 0);
    }
}

module.exports = Light;