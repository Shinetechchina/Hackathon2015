
var express = require('express')  
, http = require('http')  
, config = require('./config') 
, path = require('path');  

var bodyParser =  require("body-parser");  
  
var app = express();  
app.use(bodyParser.urlencoded({ extended: false }));  


var deviceServer = null;
app.setDeviceServer = function(_deviceServer){
  deviceServer = _deviceServer;
}
app.get('/',function(req,res,next){
  res.send(config.get(config.DEFAULT_DEVICE_ID));  
});  

app.post('/',function(req,res,next){
  var deviceID = req.body.id || config.DEFAULT_DEVICE_ID;
  var pin = req.body.pin;
  var value = req.body.value;
  config.set(deviceID,pin,value);
  deviceServer.sendCommand(deviceID,pin,value);
  res.send(config.get(deviceID));
});  

module.exports = app;
