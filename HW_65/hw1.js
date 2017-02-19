const events = require('events'),
    eventEmitter = new events.EventEmitter();

//eventEmitter.setMaxListeners(11);
setInterval(function () {
    readFile();
}, 1000);
function readFile() {
    eventEmitter.emit('seconds');
}
eventEmitter.on('seconds', () => {
    console.log(new Date());
});
