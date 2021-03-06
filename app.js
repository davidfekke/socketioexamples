
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

// all environments
app.set('port', 3000); //process.env.PORT || 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/sample2', function (req, res) {
  res.sendfile(__dirname + '/public/sample2.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('sample2', function (data) {
    console.log('mytime: ' + data.mydata);
	socket.emit('sample2res', 'This is my response ' + new Date().getTime());
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
