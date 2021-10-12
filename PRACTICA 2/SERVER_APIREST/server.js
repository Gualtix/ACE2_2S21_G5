const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
var mongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://db:27017/"
const nameDB = 'arqui2';
const port = 3000;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb', extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoClient.connect(urlMongo, { useUnifiedTopology: true })
.then(client => {
    console.log("Conectado a la base de datos!")
	const db = client.db(nameDB)
	const coleccion = db.collection('data');
    

    app.get('/', (req, res) => {
        res.send('API ARQUI 2 :D');
    });

    
    //INFORMACION JSON
    app.get('/informacion/temperatura/json',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(resulta =>
            {
                console.log(resulta)
                let result = resulta[0]
            console.log("Obtener datos!!");
            let value = 
            {
                "temperatura": result.temperatura
            }
            res.status(200).json((value));
        })
        .catch(error => {
            res.status(404).send("error");
            console.error(error)
        });
    });

    app.get('/informacion/humedad/json',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(resulta =>
            {
                console.log(resulta)
                let result = resulta[0]
            console.log("Obtener datos!!");
            let value = 
            {
                "humedad": result.humedad
            }
            res.status(200).json((value));
        })
        .catch(error => {
            res.status(404).send("error");
            console.error(error)
        });
    });

    app.get('/informacion/velocidad/json',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(resulta =>
            {
                console.log(resulta)
                let result = resulta[0]
            console.log("Obtener datos!!");
            let value = 
            {
                "velocidad": result.velocidad
            }
            res.status(200).json((value));
        })
        .catch(error => {
            res.status(404).send("error");
            console.error(error)
        });
    });

    app.get('/informacion/direccion/json',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(resulta =>
            {
                console.log(resulta)
                let result = resulta[0]
            console.log("Obtener datos!!");
            let value = 
            {
                "direccion": result.direccion
            }
            res.status(200).json((value));
        })
        .catch(error => {
            res.status(404).send("error");
            console.error(error)
        });
    });

    app.get('/informacion/luminosidad/json',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(resulta =>
            {
                console.log(resulta)
                let result = resulta[0]
            console.log("Obtener datos!!");
            let value = 
            {
                "luminosidad": result.luminosidad
            }
            res.status(200).json((value));
        })
        .catch(error => {
            res.status(404).send("error");
            console.error(error)
        });
    });

    //GENERAL
    app.get('/informacion',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(resulta =>
        {
            console.log(resulta)
            let result = resulta[0]
            console.log("Obtener datos!!");
            let value = 
            {
                "porcentaje_humedad": result.humedad,
                "celcius_temperatura": result.temperatura,
                "kmh_viento": result.velocidad,
                "direccion_viento": result.direccion,
                "lumenes": result.luminosidad
            }
            res.status(200).json((value));
        })
        .catch(error => {
            res.status(404).send("error");
            console.error(error)
        });
    });

    app.post('/informacion',(req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        let result = req.body;
        let value = 
        {
            "humedad": result.humedad,
            "temperatura": result.temperatura,
            "velocidad": result.velocidad,
            "direccion": result.direccion,
            "luminosidad": result.luminosidad
        }
        coleccion.insertOne(value)
        .then(resultado => {
            console.log("Registro Insertado!");
            res.status(200).send('Registro Insertado!');
        })
        .catch(error => {
            console.error("Error al insertar un registro: ", error)
            res.status(404).send('No se han insertado datos');
        });
    });

    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error);