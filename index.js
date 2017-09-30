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

app.use(cors());
app.use(bodyParser.json());

app.post('/light', (req, res) => {
    let action = req.body.on;

    light.state(action);

    res.json({ light: action });
});

app.post('/garage', (req, res) => {
    
    garage.toggle();

    res.json({ clicked: true });
});

app.post('/servo', (req, res) => {
    let id = req.body.servoId;
    let angle = req.body.angle;
    
    new Servo(id)
        .turn(angle)
        .then(() => {
            res.json({
                id: id,
                angle: angle
            });
        })
        .catch((e)=>{
            res.status(500).json({
                id: id,
                angle: angle,
                error: e
            });
        });
});

server.listen(port, () => console.log('server alive'));