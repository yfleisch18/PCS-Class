'use strict';
const fs = require('fs');
const fileContents = fs.readFileSync(process.argv[2]);
console.log(fileContents.toString().split('\n').length - 1);