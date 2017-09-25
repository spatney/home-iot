const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');

const Light = require('./lib/light');
const Garage = require('./lib/garage');
const Servo = require('./lib/servo');

const port = 3000;
const light = new Light();
const garage = new Garage();
const verticalServo = new Servo(1);
const horizontalServo = new Servo(0);

app.use(cors());
app.use(bodyParser.json());

app.post('/light', (req, res) => {
    let action = req.body.on;
    action ? light.on() : light.off();

    res.json({ light: action });
});

app.post('/garage', (req, res) => {
    garage.click();

    res.json({ clicked: true });
});

app.post('/servo', (req, res) => {
    let id = req.body.servoId;
    let angle = req.body.angle;
    let promise;
    if (id === 1) {
        promise = verticalServo.turn(angle);
    } else {
        promise = horizontalServo.turn(angle);
    }

    promise.then(() => {
        res.json({
            id: id,
            angle: angle
        });
    });
});

server.listen(port, () => {
    console.log('server alive');
});