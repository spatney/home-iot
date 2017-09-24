let Light = require('./lib/light');
let light = new Light();


setTimeout(() => {
    light.on();
    setTimeout(() => {
        light.off();
    }, 2000);
}, 3000);

console.log('waiting 3 seconds');