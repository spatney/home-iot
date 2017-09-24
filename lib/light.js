let Xbee = require('./lib/xbee');
let xbee = new Xbee('/dev/serial0');

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