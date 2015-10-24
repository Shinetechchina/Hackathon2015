
var express = require('express')  
, http = require('http')  
, config = require('./config') 
, path = require('path');  

var app = express();  


app.get('/',function(req,res,next){
  res.send(config.get(config.DEFAULT_DEVICE_ID));  
});  

app.post('/',function(req,res,next){
  res.send({status:'json'});  
});  

module.exports = app;
