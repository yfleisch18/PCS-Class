'use strict';
var http = require('http'),
    url = require('url');
var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var time = new Date(parsedUrl.query.iso);
    var result;
    if (url.parse(req.url, true).pathname === '/api/parsetime') {
        result = parsetime(time);
    }
    else if (url.parse(req.url, true).pathname === '/api/unixtime') {
        result = unixtime(time);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
}).listen(+process.argv[2]);

function parsetime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    };
}

function unixtime(time) {
    return { unixtime: time.getTime() };
}


