'use strict';
'use strict';

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
    };
var data,
    list;


module.exports = (request, response, next) => {
    console.log('serving', request.url);
    fs.readdir('../express', (err, list) => {
        if (err) {
            console.log(err);
        } else {
            list.map(function (elem) {
                if ('/' + elem === request.url) {
                    data = fs.readFileSync('../express/' + request.url, 'utf-8');
                    response.write(data);
                    next();
                }
            });
        }
        next();
    });

};


