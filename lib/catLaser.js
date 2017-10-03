const Servo = require('./servo');
const MAX_SWEEP = 20;
const MAX_PITCH = 20;

const CENTER_SWEEP = 90;
const CENTER_PITCH = 90;

class CatLaser {

    running = false;
    t = 0;

    constructor(sweepMotor, pitchMotor) {
        this.sweepMotor = new Servo(sweepMotor);
        this.pitchMotor = new Servo(pitchMotor);
    }

    start() {
        if (running) return;
        running = true;

        this.t = setInterval(() => {
            this.move();
        }, 1000);
    }

    move() {
        let m1 = CENTER_SWEEP + (((Math.random() - 0.5) * MAX_SWEEP) * 2)
        let m2 = CENTER_PITCH + (((Math.random() - 0.5) * MAX_PITCH) * 2)

        this.sweepMotor.turn(m1);
        this.pitchMotor.turn(m2);
    }

    stop() {
        running = false;
        clearInterval(this.t);
    }

}

module.exports = CatLaser;