const SpiderSocket = require('spider-device');
const DeviceController = require('./lib/deviceController');

const socket = new SpiderSocket({
    appId: '123456',
    uid: 'home'
});

const deviceController = new DeviceController(socket);

socket.register(() => {
    console.log('registered');
    socket.on('command', command => {
        console.log('running command');
        deviceController.execCommand(command);
    });
});