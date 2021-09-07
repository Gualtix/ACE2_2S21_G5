//WEB
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
var router = express.Router();
const port = 3000;
const hostname = '34.125.201.133';
var axios = require('axios');

//SERIAL
var SerialPort = require("serialport");
var Delimiter = require('@serialport/parser-delimiter');
var port = 3000;
var arduinoCOMPort = "\\\\.\\COM3";

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb', extended: true }));

/*
Modelo de datos

*/


var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
 baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

var parser = arduinoSerialPort.pipe(new Delimiter({ delimiter: '\n' }));

parser.on('data', function(data){
	data = data.toString();
	if(data.includes('{') && data.includes('}'))
	{
		//POST -> EN SILLA

		//POST -> SALIO SILLA

	}

});
