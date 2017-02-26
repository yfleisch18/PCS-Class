'use strict';
var http = require('http'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    const rs = fs.createReadStream(process.argv[3], 'utf-8');
    rs.pipe(res);
}).listen(process.argv[2]);