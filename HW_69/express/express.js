var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.write('<h1>Hello World!!</h1><hr/>');
    console.log('Time:', new Date().toLocaleTimeString());
    next();
});
app.use(require('./fileServer.js'));
app.get('/hiya', function (req, res, next) {
    res.write('<h2>Im in hiya</h2><br/> ');
    next();
});
app.get('/hiya', function (req, res) {
    res.end('<h2>I ended  in hiya</h2><br/> ');
});
app.use(function (req, res, next) {
    res.end('<h2>You ended in a general area.</h2>');
});
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});