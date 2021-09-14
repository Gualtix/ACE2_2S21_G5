const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
var mongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://db:27017/"
const nameDB = 'arqui2';

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb', extended: true }));

/*
Modelo de datos



*/

mongoClient.connect(urlMongo, { useUnifiedTopology: true })
.then(client => {
    console.log("Conectado a la base de datos!")
	const db = client.db(nameDB)
	const coleccion = db.collection('data')


    app.get('/', (req, res) => {
        res.send('API ARQUI 2 :D');
    });

    app.post('/insertData',(req, res)=>{
        const data = req.body;
        
		if(data.en_silla == null || data.peso == null || data.fecha == null)
		{
			res.status(404).send('No se han insertado datos');
		}else{

            const informacion = {
				"en_silla": data.en_silla,
				"peso": data.peso,
				"fecha": data.fecha
			}

			coleccion.insertOne(informacion)
			.then(result => {
				console.log("Registro Insertado!");
				res.status(200).send('Registro Insertado!');
			})
			.catch(error => console.error("Error al insertar un registro: ", error));
		}
    });

    app.get('/getAll', async (req, res) => {
        coleccion.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(results)
        })
        .catch(error => console.error(error))
    });

    app.get('/deleteAll', (req, res) => {
        coleccion.drop().then(result => {
            console.log("Eliminado!")
            res.status(200).send("Eliminado!")
        }).catch(err => console.error(err))
    });
	
    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error)
