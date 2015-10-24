var DEFAULT_DEVICE_ID = "100";
var DATA = {
}


module.exports.set = function(deviceID,pin,value,force){
  deviceID = deviceID.toString();
  pin = parseInt(pin,10);
  if(!pin){ return; }
  if(value == "1"){
    value = 1;
  }else{
    value = 0;
  }
  DATA[deviceID] = DATA[deviceID] || [];
  var devices = DATA[deviceID];
  for(var i = 0; i < devices.length; i++){
    if(devices[i] && devices[i].id == pin){
      devices[i].status = value
      return;
    }
  }
  if(force){
    var device = {};
    device.status = value;
    device.id = pin;
    devices.push(device);
  }
};

module.exports.get = function(deviceID){
  deviceID = deviceID.toString();
  DATA[deviceID] = DATA[deviceID] || []
  return DATA[deviceID];
};
module.exports.DEFAULT_DEVICE_ID = DEFAULT_DEVICE_ID;
