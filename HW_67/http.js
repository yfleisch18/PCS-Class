'use strict';
const http = require('http');
var info = '';
http.get('http://localhost/web/keyboard/index.html', response => {
    response.setEncoding('utf-8');
    // response.on('data', data => info += data);
    response.on('data', data => console.log(data));
});