'use strict';
const myModule = require('./modules.js');
myModule(process.argv[2], process.argv[3], function (err, list) {
    for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
    }
});