//WEB
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
const port = 3000;
const hostname = '34.136.38.118';
var axios = require('axios');

//SERIAL
var SerialPort = require("serialport");
var Delimiter = require('@serialport/parser-delimiter');
var arduinoCOMPort = "\\\\.\\COM7";

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

arduinoSerialPort.on('open', function () {
	console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

var parser = arduinoSerialPort.pipe(new Delimiter({ delimiter: '\n' }));

parser.on('data', function (data) {
	var dato = data.toString();
	if (dato.includes('{') && dato.includes('}')) {
		var fecha_envio = Date.now();
		var n_date = new Date(fecha_envio).toISOString();
		var datos = JSON.parse(JSON.parse(JSON.stringify(dato)));
		datos.fecha = n_date.toString();
		/*
		console.log(datos.fecha);
		var time_millis = new Date(n_date).getTime() - (1000 * 60 * 60)
		console.log(new Date(time_millis));
		*/
		console.log(datos);
		sendData(datos);
	}

});

sendData = function (body) {
	var config = {
		method: 'post',
		host: hostname,
		port: port,
		path: '/insertData',
		url: 'http://' + hostname + ':' + port + '/insertData',
		headers: {
			'Content-Type': 'application/json'
		},
		data: body
	};

	axios(config)
		.then(function (response) { console.log(response.status, response.data); })
		.catch(function (error) { });
}
