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

    //USUARIO
    app.post('/informacion',(req, res)=>{
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
        if(data.Nombre != null || data.Ubicacion != null || data.Silla != null)
        {
            const informacion = {
                "luminosidad": data.luminosidad,
                "humedad": data.humedad,
                "temperatura": data.temperatura,
                "direccion": data.direccion,
                "velocidad": data.velocidad
            }
            
            coleccion.insertOne(informacion)
            .then(result => {
                console.log("Registro Insertado!");
                res.status(200).send('Registro Insertado!');
            })
            .catch(error => {
                console.error("Error al insertar un registro: ", error)
                res.status(404).send('No se han insertado datos');
            });
        }
        else{
            res.status(404).send('No se han insertado datos');
        }
    });



    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error);