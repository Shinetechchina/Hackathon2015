var net = require('net');
var config = require('./config');
var HOST = '127.0.0.1';
//var HOST = '121.199.62.35';
var PORT = 4000;
var DEVICE_ID = config.deviceID;

var Commands = {};

Commands.set = function(sock,values){
    console.log(values);
    if(values.length == 3){
    }else if (values.length == 4){
    }
}

Commands.get = function(sock,values){
}

var register = function(client){
  client.write(["register", '' + DEVICE_ID + "\n"].join(","));
  for(var i = 0; i < config.devices.length; i++){
    value = 0;
    client.write(["set",config.devices[i],'' + value + "\n" ].join(","));
  }
}

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  console.log('CONNECTED to Server');
  register(client);
  client.on('data',function(data){
    var lines = data.toString().toLowerCase().trim().split("\n");
    for(var i = 0; i < lines.length; i++){
      var line = lines[i].toLowerCase().trim();
    console.log("<< " + line);
    var t = line.split(",");
    if(t && t.length > 0){
      var cmd = t[0].trim();
      if(Commands[cmd]){
        Commands[cmd](client,t);
      }else{
        console.log(t);
      }
    }
    }
  });
})
