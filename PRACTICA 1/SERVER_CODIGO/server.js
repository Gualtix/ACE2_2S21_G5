const express = require('express');
const app = express();
var SerialPort = require("serialport");
var Delimiter = require('@serialport/parser-delimiter');
var mongoClient = require('mongodb').MongoClient;

var port = 3000;
var arduinoCOMPort = "\\\\.\\COM3";
const urlMongo = "mongodb://34.67.81.164:27017/"
var nameDB = "arqui2";

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
		var dato_send = JSON.parse(data);
		mongoClient.connect(urlMongo, { useUnifiedTopology: true })
		.then(client => {
			const db = client.db(nameDB)
			const coleccion = db.collection('data')
			var count_data = coleccion.countDocuments({});
			count_data = count_data + 1;
			var climate = {
				"Id": count_data,
				"Temperatura": dato_send.Temperatura,
				"Humedad": dato_send.Humedad,
				"Viento": dato_send.Viento,
				"Direccion": dato_send.Direccion
			}
			console.log(climate);
			coleccion.insertOne(climate);
		}).catch(console.error);
	}

});