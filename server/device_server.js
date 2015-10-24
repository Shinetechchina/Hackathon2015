var net = require('net');
var config = require('./config');

var connections = {};


var Commands = {};
Commands.register = function(sock,values){
  if(values.length=2){
    connections[values[1]] = sock;
  }
}

Commands.set = function(sock,values){
    if(values.length == 3){
      config.set(config.DEFAULT_DEVICE_ID,t[1],t[2]);
    }else if (values.length == 4){
      config.set(t[1],t[2],t[3]);
    }
}

Commands.get = function(sock,values){
}

var app = net.createServer();
app.on('connection', function(sock) {
  console.log("new connection");
  sock.on('data', function(data) {
    var line = data.toString().toLowerCase().trim();
    console.log(line);
    var t = line.split(",");
    if(t && t.length > 0){
      var cmd = t[0].trim();
      if(Commands[cmd]){
        Commands[cmd](sock,t);
      }else{
        console.log(t);
      }
    }
  });
});

app.sendCommand = function(deviceID,pin,value){
  pin = parseInt(pin,10);
  console.log(pin);
  if(!pin){ return; }
  if(value == "1"){
    value = 1;
  }else{
    value = 0;
  }

  var sock = connections[deviceID];
  console.log([deviceID, 'set',pin,value].join(','));
  if (sock){
    sock.write(['set',pin,value].join(','));
  }else{
    console.log("sock not found");
  }
}

module.exports = app;
