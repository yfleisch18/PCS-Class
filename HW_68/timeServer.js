'use strict';

const net = require('net'),
    server = net.createServer(function (socket) {
        const now = new Date();
        socket.write(now.getFullYear() + '-');
        socket.write(zeroes(now.getMonth() + 1) + '-');
        socket.write(zeroes(now.getDate()) + ' ');
        socket.write(zeroes(now.getHours()) + ':');
        socket.write(zeroes(now.getMinutes()) + '\n');
        socket.end('\n');
    }).listen(+process.argv[2]);

function zeroes(i) {
    return (i < 10 ? '0' : '') + i;
}