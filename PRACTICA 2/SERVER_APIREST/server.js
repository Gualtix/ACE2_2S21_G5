const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();
var mongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://34.67.81.164:27017/"
var nameDB = "arqui2";

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
	
    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error)
