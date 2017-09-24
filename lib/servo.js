const makePwmDriver = require('adafruit-i2c-pwm-driver')// use this one in rea$
var NanoTimer = require('nanotimer');

function sleep(seconds) {
    return new Promise(function (resolve, reject) {
        var timer = new NanoTimer();
        timer.setTimeout(function (x) {
            return resolve(seconds);
        }, '', seconds + 's');
        timer.clearInterval();
    });
}
const pwm = makePwmDriver({ address: 0x40, device: '/dev/i2c-1', debug: true })
const servo_min = 150 // Min pulse length out of 4096
const servo_max = 600 // Max pulse length out of 4096

pwm.setPWMFreq(50);

class Servo {
    constructor(channel) {
        this.channel = channel;
    }

    turn(angle) {
        if (angle < 10)
            angle = 10;
        if (angle > 170)
            angle = 170;

        return sleep(0)
            .then(() => {
                return pwm.setPWM(this.channel, 0, (servo_min + (servo_max - servo_min) * angle/180));
            })
            .then(function () {
                return sleep(1);
            })
            .then(function () {
                return pwm.setAllPWM(0, 0);
            });
    }
}

module.exports = Servo;