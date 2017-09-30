const Light = require('./light');
const Garage = require('./garage');
const Servo = require('./servo');

const light = new Light(1);
const garage = new Garage(3);

class DeviceController {
    constructor(socket){
        this.socket = socket;
    }

    execCommand(command) {
        switch (command.device) {
            case 'light':
                let action = command.action;
                light.state(action);
                break;

            case 'garage':
                garage.toggle();
                break;
    
            case 'servo':
                let id = command.id;
                let angle = command.angle;
    
                new Servo(id)
                    .turn(angle)
                    .then(() => {
                        res.json({
                            id: id,
                            angle: angle
                        });
                    })
                    .catch((e) => {
                        res.status(500).json({
                            id: id,
                            angle: angle,
                            error: e
                        });
                    });
                break;
                
            default: console.error('command unknown', JSON.stringify(command));
        }
    }
}

module.exports = DeviceController;