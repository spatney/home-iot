const SpiderSocket = require('spider-device');

const Light = require('./lib/light');
const Garage = require('./lib/garage');
const Servo = require('./lib/servo');


const port = 3000;
const light = new Light(1);
const garage = new Garage(3);

const socket = new SpiderSocket({
    appId: '123456',
    uid: 'home'
});

socket.register(() => {
    console.log('registered');
    socket.on('command', command => {
        console.log('running command');
        execCommand(command);
    });
});

function execCommand(command) {
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