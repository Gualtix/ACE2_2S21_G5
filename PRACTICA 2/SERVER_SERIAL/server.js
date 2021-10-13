//WEB
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')

const app = express();
const port = 3000;
const hostname = '146.148.63.252';
const endpoint = 'informacion'
var axios = require('axios');

//SERIAL
var SerialPort = require("serialport");
var Delimiter = require('@serialport/parser-delimiter');
var bluetoothCOMPort = "\\\\.\\COM11";

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb', extended: true }));

var bluetoothSerialPort = new SerialPort(
    bluetoothCOMPort,
    {
        baudRate: 9600
    }
)

bluetoothSerialPort.on(
    'open',
    () => console.info(`Serial port ${bluetoothCOMPort} is opened`)
)

var parser = bluetoothSerialPort.pipe(
    new Delimiter({
        delimiter: '\n'
    })
)

parser.on(
    'data',
    (data) => {
        var data_str = data.toString()
        if (data_str.includes('{') && data_str.includes('}')) {
            data_obj = JSON.parse(data)
			console.log(data_obj)
			if(data_obj.humedad && data_obj.humedad && data_obj.humedad && data_obj.humedad && data_obj.humedad) sendData(data_obj)
			else console.log("No se puede registrar");
        }
    }
)

sendData = (body) => {
    var config = {
        method: 'post',
        host: hostname,
        port: port,
        path: `/${endpoint}`,
        url: `http://${hostname}:${port}/${endpoint}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    }

    axios(config)
        .then(res => console.info(res.status, res.data))
        .catch(err => { })
}