var net = require('net');
var config = require('./config');

var connections = {};


var Commands = {};
Commands.register = function(sock,values){
  if(values.length=2){
    sock.deviceID = values[1];
    connections[values[1]] = sock;
  }
}

Commands.heartbeat = function(sock,values){
}
Commands.set = function(sock,values){
    if(values.length == 3){
      config.set(sock.deviceID || config.DEFAULT_DEVICE_ID,values[1],values[2],true);
    }
}

Commands.get = function(sock,values){
}

var app = net.createServer();
app.on('connection', function(sock) {
  console.log("new connection");
  sock.on('error', function(ex) {
      console.log("handled error");
      console.log(ex);
  });
  sock.on('data', function(data) {
    var lines = data.toString().toLowerCase().trim().split("\n");
    for(var i = 0; i < lines.length; i++){
      var line = lines[i].toLowerCase().trim();
    console.log("<< " + line);
    var t = line.split(",");
    if(t && t.length > 0){
      var cmd = t[0].trim();
      if(Commands[cmd]){
        Commands[cmd](sock,t);
      }else{
        console.log(t);
      }
    }
    }
  });
});

app.sendCommand = function(deviceID,pin,value){
  pin = parseInt(pin,10);
  if(!pin){ return; }
  if(value == "1"){
    value = 1;
  }else{
    value = 0;
  }

  var sock = connections[deviceID];
  if (sock){
    sock.write(['set',pin,value].join(','));
  }else{
    console.log("sock not found");
  }
}

module.exports = app;
