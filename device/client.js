var net = require('net');
var HOST = '127.0.0.1';
//var HOST = '114.215.146.89';
var PORT = 4000;
var DEVICE_ID = "xxx";

var Commands = {};

Commands.set = function(sock,values){
    console.log(values);
    if(values.length == 3){
    }else if (values.length == 4){
    }
}

Commands.get = function(sock,values){
}

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  console.log('CONNECTED to Server');
  console.log(["register", DEVICE_ID, "\n"].join(","));
  client.write(["register", DEVICE_ID].join(","));
  client.on('data',function(data){
    var line = data.toString().toLowerCase().trim();
    var t = line.split(",");
    if(t && t.length > 0){
      var cmd = t[0].trim();
      if(Commands[cmd]){
        Commands[cmd](client,t);
      }else{
        console.log(t);
      }
    }
  });
})
