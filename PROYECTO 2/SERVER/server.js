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
	const coleccion = db.collection('data')
    const coleccion1 = db.collection('info_usuario')
    const coleccion2 = db.collection('configuracion')
    const coleccion3 = db.collection('tiempo_uso')
    

    app.get('/', (req, res) => {
        res.send('API ARQUI 2 :D');
    });

    //USUARIO
    app.post('/usuario',(req, res)=>{
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
        if(data.Nombre != null || data.Ubicacion != null || data.Silla != null)
        {
            const informacion = {
                "Nombre_Usuario": data.Nombre,
                "Ubicacion": data.Ubicacion,
                "Silla": data.Silla,
                "Tiempo": data.Tiempo
            }
            
            coleccion1.insertOne(informacion)
                .then(result => {
                    coleccion1.drop().then(result => {
                        console.log("Eliminado!")
                        
                        coleccion1.insertOne(informacion)
                        .then(result => {
                            console.log("Registro Insertado!");
                            res.status(200).send('Registro Insertado!');
                        })
                        .catch(error => console.error(error));
                    }).catch(error => console.error(error))
                })
                .catch(error => console.error(error))
        }
        else{
            res.status(500).send('No se han insertado datos');
        }
    });


    //Configuracion

    app.post('/configuracion',(req, res)=>{
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
        if(data.Tipo != null || data.Tiempo != null)
        {
            const informacion = {
                "Configuracion": data.Tipo,
                "Tiempo": data.Tiempo
            }
            
            coleccion2.insertOne(informacion)
                .then(result => {
                    coleccion2.drop().then(result => {
                        console.log("Eliminado!")
                        
                        coleccion2.insertOne(informacion)
                        .then(result => {
                            console.log("Registro Insertado!");
                            res.status(200).send('Registro Insertado!');
                        })
                        .catch(error => console.error(error));
                    }).catch(error => console.error(error))
                })
                .catch(error => console.error(error))
        }
        else{
            res.status(500).send('No se han insertado datos');
        }
    });

  
    app.get('/usuario/informacion', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion1.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(results)
        })
        .catch(error => console.error(error))
    });

    //INFORMACION
    app.post('/insertData',(req, res)=>{
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
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
                coleccion2.find().toArray()
                .then(results => {
                    console.log("Obtener datos!");
                    console.log(results);
                    
                    if(results.length > 0)
                    {
                        let conf = results[0];
                        console.log(conf.Configuracion)
                        if(conf.Configuracion == "Pomodoro")
                        {
                            const info = 
                            {
                                "Led": "verde"
                            }
                            res.status(200).json(info)
                        }
                        else if(conf.Configuracion == "Short")
                        {
                            const info = 
                            {
                                "Led": "amarrillo"
                            }
                            res.status(200).json(info)
                        }
                        else {
                            const info = 
                            {
                                "Led": "rojo"
                            }
                            res.status(200).json(info)
                        }
                    }
                    else{
                        const info = 
                        {
                            "Led": ""
                        }
                        res.status(200).json(info)
                    }
                    
                })
                .catch(error => console.error(error))
				//res.status(200).send('Registro Insertado!');
			})
			.catch(error => console.error(error))
		}
    });

    app.post('/tiempoUso',(req, res)=>{
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
		if(data.Tiempo == null)
		{
			res.status(404).send('No se han insertado datos');
		}else{

            const informacion = {
				"Tiempo": data.Tiempo
			}

			coleccion3.insertOne(informacion)
			.then(result => {
				console.log("Registro Insertado!");
				res.status(200).send('Registro Insertado!');
			})
			.catch(error => console.error(error))
		}
    });

    app.get('/getStatus', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().sort({$natural:-1}).limit(1).toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json((result));
        })
        .catch(error => console.error(error));
    });

    app.get('/LastoPeso', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find({ en_silla: true}).sort({$natural:-1}).limit(1).toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json((result));
        })
        .catch(error => console.error(error));
    });

    //TODA_DATA
    app.get('/getAll', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(results)
        })
        .catch(error => console.error(error))
    });

    app.get('/getHorasUso', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find({ en_silla: true }).toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(results)
        })
        .catch(error => console.error(error))
    });

    app.get('/obtenerTiempo', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion1.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            const inf = {
                "Pomodoro": results[0].Tiempo,
                "Short_Break": Math.round(results[0].Tiempo*0.25),
                "Large_Break": Math.round(results[0].Tiempo*0.5)
            }
            res.status(200).json(inf)
        })
        .catch(error => console.error(error))
    });

    app.get('/deleteAll', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.drop().then(result => {
            console.log("Eliminado!")
            res.status(200).send("Eliminado!")
        }).catch(err => console.error(err))
    });

    app.get('/reiniciar/configuracion', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion2.drop().then(result => {
            console.log("Eliminado!")
            res.status(200).send("Eliminado!")
        }).catch(err => console.error(err))
    });

    app.get('/tiempos', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(tiempos(results))
        })
        .catch(error => console.error(error))
    });

    app.get('/tiemposUso', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(tiempos1(results))
        })
        .catch(error => console.error(error))
    });

    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error);

function tiempos(result)
{
    let parado = 0;
    let sentado = 0;
    result.forEach(element => {
       if(element.en_silla) sentado = sentado + 1;
       else parado = parado + 1;
    });
    const info = 
    {
        "Parado": parado,
        "Sentado": sentado
    }
    return info;
}

function tiempos1(result)
{
    let tiempo = 0;
    result.forEach(element => {
       tiempo = tiempo  + element.Tiempo;
    });
    const info = 
    {
        "Tiempo": tiempo
    }
    return info;
}

