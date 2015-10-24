var net = require('net');
var config = require('./config');

var app = net.createServer(function(socket) {
  // new connection
  socket.on('data', function(data) {
    var line = data.toString().trim();
    var t = line.split(",");
    if(t && t.length == 2){
      config.set(config.DEFAULT_DEVICE_ID,t[0],t[1]);
    }else if (t && t.length == 3){
      config.set(t[0],t[1],t[2]);
    }
  });
  socket.on('end', function(data) {
    // connection closed
  });
})


module.exports = app;
