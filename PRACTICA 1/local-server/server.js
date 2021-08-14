const express = require('express');
const app = express();
var SerialPort = require("serialport");
var Delimiter = require('@serialport/parser-delimiter');

var port = 3000;

var arduinoCOMPort = "\\\\.\\COM6";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
 baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

var parser = arduinoSerialPort.pipe(new Delimiter({ delimiter: '\n' }));

parser.on('data', function(data){
  data = data.toString();
  console.log(data);
})