var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(80);

const socket_io = require('socket.io');
const io = socket_io.listen(server);
app.locals.names = {};
var allMessages = [],
  tempMessages = [],
  index = 0;
// Wait for connection
io.on('connection', socket => {
  var name;
  console.log('Got a connection');
  socket.on('passwordComplete', data => {
    name = data;
    sendingData = { name: 'Jake@server.net', message: data + ' just joined our chat!', index: index }
    io.sockets.emit('message', sendingData);
    allMessages.push(sendingData);
    app.locals.names[data] = socket;
  });
  // wait for 'message' events on this connection
  socket.on('message', data => {
    Object.keys(app.locals.names).map(e => {
      if (e === data.name) {
        sendingData = { name: e, message: data.message, index: index };
        io.sockets.emit('message', sendingData);
        allMessages.push(sendingData);
      }
    });
  });
  socket.on('disconnect', data => {
    console.log(name);
    var disconnectData = { name: 'jake@server.net', message: name + ' has just left us. We wish him all the best!', index: index };
    io.sockets.emit('message', disconnectData);
    allMessages.push(disconnectData);
  });
  socket.on('refresh', data => {
    console.log(data.rfrsh);
    if (data.rfrsh) {
      // for (var i = index - 1; i > number; i--) {
      //   tempMessages.push(allMessages[i]);
      //   console.log('temp', tempMessages);
      // }
      io.sockets.emit('refresh', { allMessages: allMessages });
      // tempMessages = [];
    }
  });

});
