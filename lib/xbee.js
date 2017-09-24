let SerialPort = require('serialport');

class Xbee {
    constructor(port) {
        port = port || '/dev/serial0';
        this.xbee = new SerialPort(port, { baudrate: 9600 });
        this.xbee.on('open', () => console.log('xbee port open'));
        console.log('waiting for xbee port to be open');
    }

    send(device, val) {
        console.log(`sending ${val} to ${device}`);
        this.xbee.write(`${device}-${val}-`);
    }
}

let xbee;

function createXbee(){
    if(!xbee)
        xbee = new Xbee();

    return xbee;

}

module.exports = createXbee;