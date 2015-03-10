var express = require("express");
http = require('http');
var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);


app.get('/', function(req, res) {

  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message:' + msg);
    var date = new Date();
    socket.broadcast.emit('chat message', date +  " : " + msg);
  });
});

server.listen(3000);
console.log('Listening on port 3000..');
