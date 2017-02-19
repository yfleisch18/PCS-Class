'use strict';
const fs = require('fs');
fs.readdir(process.argv[2], (err, list) => {
    if (err) {
        console.error(err);
    } else {
        list.map(function (elem) {
            if (elem.split('.')[1] === process.argv[3]) {
                console.log(elem);
            }
        });
    }
});


