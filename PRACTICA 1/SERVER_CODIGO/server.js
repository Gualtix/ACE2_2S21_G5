const express = require('express');
const app = express();
const cors = require('cors');
//var SerialPort = require("serialport");
//var Delimiter = require('@serialport/parser-delimiter');
//var port = 3000;
//var arduinoCOMPort = "\\\\.\\COM3";
var mongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://34.67.81.164:27017/"
var nameDB = "arqui2";
const port = 8990;

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '5mb', extended: true }));


/*
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
*/




mongoClient.connect(urlMongo, { useUnifiedTopology: true })
.then(client => {
    console.log("Conectado a la base de datos!")
	const db = client.db(nameDB)
	const coleccion = db.collection('data')


    app.get('/', (req, res) => {
        res.send('API ARQUI 2 :D');
    });
	
    app.post('/inforClimate', (req, res)=>{
		console.log(req.body);
		var dato_send = JSON.parse(JSON.stringify(req.body));
		if(dato_send.Temperatura != undefined)
		{
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
				res.send(climate);
		}
		else{
			res.send("no data parseada");
		}

	});



    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error)
