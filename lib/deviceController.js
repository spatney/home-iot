const Light = require('./light');
const Garage = require('./garage');
const Servo = require('./servo');
const publicIp = require('public-ip');
const CatLaser = require('./catLaser');

const light = new Light(1);
const garage = new Garage(3);
const cat = new CatLaser(3,2);

class DeviceController {
    constructor(socket) {
        this.socket = socket;
    }

    execCommand(command) {
        switch (command.device) {
            case 'light':
                let action = command.action;
                light.state(action);
                break;

            case 'cat':
                let start = command.start;
                start ? cat.start() : cat.stop();
                break;

            case 'garage':
                garage.toggle();
                break;

            case 'servo':
                let id = command.id;
                let angle = command.angle;

                new Servo(id)
                    .turn(angle)
                    .catch((e) => {
                        console.error('servo error', e);
                    });
                break;
            case 'ip':
                publicIp.v4().then(ip => {
                    console.log(ip);
                    this.socket.emit('ip_result', { v4: ip });
                });
                break;

            default: console.error('command unknown', JSON.stringify(command));
        }
    }
}

module.exports = DeviceController;
