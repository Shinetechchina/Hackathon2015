var DEFAULT_DEVICE_ID = "xxx";
var DATA = {
  "xxx" : {
    "devices" : [
      ]
  }
}


module.exports.set = function(deviceID,pin,value){
  pin = parseInt(pin,10);
  if(!pin){ return; }
  if(value == "1"){
    value = 1;
  }else{
    value = 0;
  }
  DATA[deviceID] = DATA[deviceID] || {};
  DATA[deviceID]["devices"] = DATA[deviceID]["devices"] || [];
  var devices = DATA[deviceID]["devices"];
  for(var i = 0; i < devices.length; i++){
    if(devices[i] && devices[i].id == pin){
      devices[i].status = value
      return;
    }
  }
  var device = {};
  device.status = value;
  device.id = pin;
  devices.push(device);
};

module.exports.get = function(deviceID){
  DATA[deviceID] = DATA[deviceID] || {};
  DATA[deviceID]["devices"] = DATA[deviceID]["devices"] || [];
  return DATA[deviceID];
};
module.exports.DEFAULT_DEVICE_ID = DEFAULT_DEVICE_ID;
