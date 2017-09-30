let Xbee = require('./xbee');
let xbee = Xbee();

class Light {
    constructor(deviceId) {
        this.deviceId = deviceId || 1;
    }

    on() {
        this.state(1);
    }

    off() {
        this.state(0);
    }

    state(val){
        xbee.send(this.deviceId, val);
    }
}

module.exports = Light;