//WEB
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
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
	var dato = data.toString();
	if(dato.includes('{') && dato.includes('}'))
	{
		var datos = JSON.parse(JSON.stringify(dato));
		var fecha_envio = Date.now();
		datos["fecha"]= fecha_envio.toString();
		//envio de data
		console.log(datos);
		sendData(datos);
	}

});

sendData = function(body) {
	var config = {
		method: 'post',
		host: hostname,
		port: port_usuarios,
		path: '/insertData',
		url: 'http://'+hostname+':'+port+'/insertData',
		headers: {
		  'Content-Type': 'application/json'
		},
		data : body
	};

	axios(config)
	.then(function (response) { console.log(response); })
	.catch(function (error) {});
}
