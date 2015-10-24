var DeviceServer = require('./device_server.js');
var WebServer = require('./web_server.js');
DeviceServer.listen(4000, function(){
  console.log("Device Server listening on port 4000");  
});  


WebServer.listen(3000, function(){
  console.log("Web Server listening on port 3000");  
});  

