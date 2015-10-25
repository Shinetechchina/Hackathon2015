var express = require('express')  
, http = require('http')  
, config = require('./config') 
, path = require('path');  
var bodyParser =  require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var deviceServer = null;
app.setDeviceServer = function(_deviceServer){
  deviceServer = _deviceServer;
}
var memoryDB = {"Tokens":[],"ControlCenters":[]};

app.post('/ControlCenters/Register',function(req,res,next){	
	var ccId = req.body.id;
	var ccName = req.body.name;
	var token = null;
	var controlCenterInfo = config.get(ccId);
	
	if(controlCenterInfo.length == 0){
		res.send({"success": false, "token":""}); 
		return;
		}
	
  token = GetTokenByCcId(ccId);
  
  	if(token == null) {
  		token = "token";
  		memoryDB.Tokens.push({"ccId": ccId, "token": token});
  		
  		var newControlCenter = 
  			{
			    "id": ccId,
			    "name": ccName,
			    "devices": controlCenterInfo
				};
  		
  		memoryDB.ControlCenters.push(newControlCenter);
  		}
  	res.send({"success": true, "token":token}); 
});  

app.get('/ControlCenters/:token',function(req,res,next){
	var token = req.params.token;
	var controlCenter = GetControlCenterByToken(token);
  res.send(controlCenter || {});
}); 

app.post('/ControlCenters/:token',function(req,res,next){
	var token = req.params.token;
	var devices = req.body.devices;
	var controlCenter = GetControlCenterByToken(token);
	if(controlCenter == null || controlCenter.devices.length != devices.length){
		res.send({"success": false}); 
		return;
		}
	for(var i = 0; i < controlCenter.devices.length; i++){
		controlCenter.devices[i].name = devices[i].name;
		}
  res.send({"success": true});
}); 

app.post('/ControlCenters/:token/Device',function(req,res,next){	
	var token = req.params.token;
	var ccId = GetCcIdByToken(token);
  var deviceId = req.body.id;
  var status = req.body.status;
  var device = GetDeviceByTokenAndId(token,deviceId);
  
  if(device == null){
  	res.send({"success": false });
  	return;
  	}
  
  config.set(ccId,deviceId,status);
  deviceServer.sendCommand(ccId,deviceId,status);
  device.status = status;
  
  res.send({"success": true });
});

app.post('/ControlCenters/:token/Config',function(req,res,next){	
	var token = req.params.token;
	var config = req.body.config;
	
	var controlCenter = GetControlCenterByToken(token);
	if(controlCenter == null){
		res.send({"success": false });
		return;
		}
		
		controlCenter.activedConfig = config;
		var currentConfigIndex = GetConfigIndexFromControlCenter(controlCenter,config.id);
		if(currentConfigIndex == -1){
			controlCenter.configs = controlCenter.configs || [];
			controlCenter.configs.push(config);
			}
			else{
				controlCenter.configs[currentConfigIndex] = config;
				}
		
		res.send({"success": true });
});

app.post('/ControlCenters/:token/SetConfigActive',function(req,res,next){
  var token = req.params.token;
  var activedConfigId = req.body.id;
  var controlCenter = GetControlCenterByToken(token);
	if(controlCenter == null){
		res.send({"success": false });
		return;
		}
  var currentConfig = GetConfigFromControlCenter(controlCenter,config.id);
  if(currentConfig == null){
  	res.send({"success": false });
		return;
  	}
  	controlCenter.activedConfig = currentConfig;
  	res.send({"success": true });
  
});

app.get('/',function(req,res,next){
  res.send(memoryDB);
});

function GetTokenByCcId(ccId){
	var token = null;
	for(var i = 0; i < memoryDB.Tokens.length; i++){
  	if(memoryDB.Tokens[i].ccId == ccId) {
  		token = memoryDB.Tokens[i]["token"];
  		break;
  	}
  }
  return token;
	}
	
function GetCcIdByToken(token){
	var ccId = null;
	for(var i = 0; i < memoryDB.Tokens.length; i++){
  	if(memoryDB.Tokens[i].token == token) {
  		ccId = memoryDB.Tokens[i]["ccId"];
  		break;
  	}
  }
	return ccId;
	}
	
function GetControlCenterByToken(token){
	var ccId = GetCcIdByToken(token);
	var controlCenter = null;
  	for(var i = 0; i < memoryDB.Tokens.length && ccId != null; i++){
  	if(memoryDB.ControlCenters[i].id == ccId) {
  		controlCenter = memoryDB.ControlCenters[i];
  		break;
  	}
  }
  return controlCenter;
	}
	
function GetDeviceByTokenAndId(token,id){
	var controlCenter = GetControlCenterByToken(token);
	var device = null;
	for(var i = 0; i < controlCenter.devices.length && controlCenter != null; i++){
		if(controlCenter.devices[i].id == id){
			device = controlCenter.devices[i];
			break;
			}
		}  
		return device;
	}
	
function GetConfigIndexFromControlCenter(controlCenter,id){
	if(controlCenter.configs != null){
		for(var i = 0;i < controlCenter.configs.length;i++){
			if(controlCenter.configs[i].id == id){
				return i;
				}
			}
		}
		return -1;
	}

	
setInterval(function(){
	//var memoryDB = {"Tokens":[],"ControlCenters":[]};
	for(var i = 0; memoryDB.ControlCenters && i < memoryDB.ControlCenters.length; i++){
		if(memoryDB.ControlCenters[i].activedConfig && memoryDB.ControlCenters[i].activedConfig.deviceSettings){
			for(var j = 0; j < memoryDB.ControlCenters[i].activedConfig.deviceSettings.length; j++){
				var deviceConfig = memoryDB.ControlCenters[i].activedConfig.deviceSettings[j];
				if(deviceConfig.model == 1){
					var dateNow = new Date();
					var hourNow = dateNow.getHours();
					var minNow = dateNow.getMinutes();
					if(deviceConfig.startTime == hourNow + ':' + minNow){
						config.set(memoryDB.ControlCenters[i].id,deviceConfig.id,1);
						deviceServer.sendCommand(memoryDB.ControlCenters[i].id,deviceConfig.id,1);
						}
						
					if(deviceConfig.endTime == hourNow + ':' + minNow){
						config.set(memoryDB.ControlCenters[i].id,deviceConfig.id,0);
						deviceServer.sendCommand(memoryDB.ControlCenters[i].id,deviceConfig.id,0);
						}
					
					}
				}			
			}
		}
},60000);

module.exports = app;
