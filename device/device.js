var net = require('net');
var config = require('./config');
var gpio = require('pi-gpio');

//var HOST = '127.0.0.1';
var HOST = '121.199.62.35';
var PORT = 4000;
var DEVICE_ID = config.deviceID;
var ON=0;
var OFF=1;

var Commands = {};
var STATUS = {};

Commands.get = function(sock,values){
}
Commands.set = function(sock,values){
    console.log(values);
    if(values.length == 3){
      var value = values[2];
      if(value == "1"){ value = 1; }else{ value = 0; }
      var pin = parseInt(values[1],10);
      if(STATUS[pin] != undefined){
        if(STATUS[pin] === value){
          console.log("does not need change status");
        }else{
          STATUS[pin] = value;
          var v = (value === 1) ? ON : OFF;
          gpio.write(pin,v,function(){
            sock.write(["set",pin,'' + value + "\n" ].join(","));
          });
        }
      }
    }
}

var setStatus = function(client,pin,value){
  STATUS[pin] = value;
  gpio.open(pin, "output",function(){
    var v = (value === 1) ? ON : OFF;
    client.write(["set",pin,'' + value + "\n" ].join(","));
  });
}


var register = function(client){
  client.write(["register", '' + DEVICE_ID + "\n"].join(","));
  for(var i = 0; i < config.devices.length; i++){
    (function(pin){
      setStatus(client,pin,0);
    })(config.devices[i])
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
