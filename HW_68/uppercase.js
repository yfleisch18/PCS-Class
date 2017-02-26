'use strict';

var http = require('http'),
    map = require('through2-map'),
    fs = require('fs');


var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(res);
    }
    const rs = fs.createReadStream('index.html', 'utf-8');
    rs.pipe(res);


}).listen(+process.argv[2]);