let express = require('express');
let app = express();
let server = require('http').createServer(app);
let bodyParser = require('body-parser');
let cors = require('cors');

let Light = require('./lib/light');
let Garage = require('./lib/garage');

let port = 3000;
let light = new Light();
let garage = new Garage();

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

server.listen(port, () => {
    console.log('server alive');
});