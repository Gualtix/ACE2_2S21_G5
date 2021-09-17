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
    

    app.get('/', (req, res) => {
        res.send('API ARQUI 2 :D');
    });

    app.post('/usuario',(req, res)=>{
        const data = req.body;
        res.header("Access-Control-Allow-Origin", "*");
        if(data.Nombre != null || data.Ubicacion != null || data.Silla != null)
        {
            const informacion = {
                "Nombre_Usuario": data.Nombre,
                "Ubicacion": data.Ubicacion,
                "Silla": data.Silla
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
                        .catch(error => {
                            console.error("Error al insertar un registro: ", error)
                            res.status(404).send('No se han insertado datos');
                        });
                    }).catch(err => {
                        console.error(err)
                        res.status(404).send('No se han insertado datos');
                    });
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

    app.get('/usuario/informacion', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion1.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(results)
        })
        .catch(error => console.error(error))
    });

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
				res.status(200).send('Registro Insertado!');
			})
			.catch(error => {
                console.error("Error al insertar un registro: ", error)
                res.status(404).send('No se han insertado datos');
            });
		}
    });

    app.get('/getAll', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(results => {
            console.log("Obtener datos!");
            res.status(200).json(results)
        })
        .catch(error => console.error(error))
    });

    app.get('/Last3Hour/Simple', async (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Last3Hour(result));
        })
        .catch(error => console.error(error));
    });

    app.get('/deleteAll', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.drop().then(result => {
            console.log("Eliminado!")
            res.status(200).send("Eliminado!")
        }).catch(err => console.error(err))
    });

    app.get('/Informacion/Agrupados', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            if(req.body.tipo == "semana")
            {
                res.status(200).json(Semana_Group(result));
            }
            else if(req.body.tipo == "mes")
            {
                res.status(200).json(Mes_Group(result));
            }
            else{
                res.status(200).json(Last_Group(result));
            }
            
        })
        .catch(error => console.error(error));
    });

    app.get('/Peso', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find( { en_silla: { $ne: false } })
        .aggregate(                                 
            [                                 
             {$group:                         
                     {         
                       peso_total: {$sum: peso}  
                     }
              }
             ]
           ).toArray()
        .then(result =>
        {
            console.log("Obtener datos!!", result);
            res.status(200).json(result);
        })
        .catch(error => console.error(error));
    });

    app.get('/Horario', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Horario(result));
        })
        .catch(error => console.error(error));
    });

    app.get('/Semana', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Semana(result));
        })
        .catch(error => console.error(error));
    });

    app.get('/Informacion/Levantado/Sentado', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Levanta_porDia(result));
        })
        .catch(error => console.error(error));
    });
	
    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error);

function getDia(dia)
{
    switch(dia)
    {
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miercoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sabado";        
    }
}

function getMes(mes)
{
    switch(mes)
    {
        case 0:
            return "Enero"
        case 1:
            return "Febrero"
        case 2:
            return "Marzo"
        case 3:
            return "Abril"
        case 4:
            return "Mayo"
        case 5:
            return "Junio"
        case 6:
            return "Julio"
        case 7:
            return "Agosto"
        case 8:
            return "Septiembre"
        case 9:
            return "Octubre"
        case 10:
            return "Noviembre"
        case 11:
            return "Diciembre"                    
    }
}


function Last_Group(informacion){
    try{
        var fecha_envio = Date.now();
		var n_date = new Date(fecha_envio).toISOString();
        var time_millis = new Date(n_date).getTime() - (1000 * 60 * 60 * 24 * 7);
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getTime()
            if(date_chair >= time_millis) 
            {
                element.Dia = new Date(element.fecha).getDay();
                lista.push(element);
            }
        });
        for(var Dia=0; Dia<7; Dia++)
        {
            var value = {
                dia: getDia(Dia),
                contador: 0
            }
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Dia == Dia)
                {
                    if(lista[a].en_silla == true)
                    {
                        peso = peso + lista[a].peso;
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == false)
                            {
                                value.contador = value.contador + 1;
                                peso = peso + lista[b].peso;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (contador>0)?peso/value.contador.toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

function Semana_Group(informacion){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Semana = new Date(element.fecha).getWeekNumber();
            lista.push(element);
        });
        /*
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].en_silla == true)
                {
                    var value = {
                        fecha1: lista[a].fecha,
                        peso1: lista[a].peso,
                        semana: lista[a].Semana
                    }
                    for(var b = a+1; b<lista.length; b++ )
                    {
                        if(lista[b].en_silla == false)
                        {
                            value.fecha2 = lista[b].fecha;
                            value.peso2 = lista[b].peso;
                            a = b;
                            break;
                        }
                    }
                    lista_aux.push(value);
                    if(a==lista.length) break;
                }
            }
        */
        for(var Semana=0; Semana<53; Semana++)
        {
            var value = {
                semana: Semana,
                contador: 0
            }
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Semana == Semana)
                {
                    if(lista[a].en_silla == true)
                    {
                        peso = peso + lista[a].peso;
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == false)
                            {
                                value.contador = value.contador + 1;
                                peso = peso + lista[b].peso;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (contador>0)?peso/value.contador.toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux.sort;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Mes_Group(informacion){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Mes = new Date(element.fecha).getMonth();
            lista.push(element);
        });
        for(var Mes=0; Mes<12; Mes++)
        {
            var value = {
                mes: getMes(Mes),
                contador: 0
            }
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Mes == Mes)
                {
                    if(lista[a].en_silla == true)
                    {
                        peso = peso + lista[a].peso;
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == false)
                            {
                                value.contador = value.contador + 1;
                                peso = peso + lista[b].peso;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (contador>0)?peso/value.contador.toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Horario(informacion){
    try{
        var fecha_envio = Date.now();
		var n_date = new Date(fecha_envio).toISOString();
        var time_millis = new Date(n_date).getTime() - (1000 * 60 * 60 * 24);
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getTime()
            if(date_chair >= time_millis) lista.push(element);
        });

        for(var a = 0; a<lista.length; a++)
        {
            if(lista[a].en_silla == true)
            {
                var value = {
                    fecha1: lista[a].fecha,
                    peso1: lista[a].peso
                }
                for(var b = a+1; b<lista.length; b++ )
                {
                    if(lista[b].en_silla == false)
                    {
                        value.fecha2 = lista[b].fecha;
                        value.peso2 = lista[b].peso;
                        a = b;
                        break;
                    }
                }
                lista_aux.push(value);
                if(a==lista.length) break;
            }
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Levanta_porDia(informacion){
    try{
        var fecha_envio = Date.now();
		var n_date = new Date(fecha_envio).toISOString();
        var time_millis = new Date(n_date).getTime() - (1000 * 60 * 60 * 24);
        const lista = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getTime()
            if(date_chair >= time_millis) lista.push(element);
        });
        var value = {
            sentado: 0,
            parado: 0
        }
        for(var a = 0; a<lista.length; a++)
        {
            if(lista[a].en_silla == true)
            {
                for(var b = a+1; b<lista.length; b++ )
                {
                    if(lista[b].en_silla == false)
                    {
                        value.parado = value.parado + 1;
                        a = b;
                        break;
                    }
                }
                if(a==lista.length) break;
            }
            else if(lista[a].en_silla == false)
            {
                for(var b = a+1; b<lista.length; b++ )
                {
                    if(lista[b].en_silla == true)
                    {
                        value.sentado = value.sentado + 1;
                        a = b;
                        break;
                    }
                }
                if(a==lista.length) break;
            }
        }
        return value;
    } catch(error) {
        console.log(error)
        var value = {
            sentado: 0,
            parado: 0
        }
        return value;
    }
}

function Semana(informacion){
    try{
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getDay()
            element.dia = getDia(date_chair);
            lista.push(element);
        });
        for(var a = 0; a<7; a++)
        {
            let value = {
                dia: getDia(a),
                contador: 0
                
            }
            lista_aux.push(value);
        }
        for(var day = 0; day<7;day++)
        {
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].en_silla == true && lista[a].dia == lista_aux[day].dia)
                {
                    for(var b = a+1; b<lista.length; b++ )
                    {
                        if(lista[b].en_silla == false && lista[a].dia == lista_aux[day].dia)
                        {
                            lista_aux[day].contador = lista_aux[day].contador + 1;
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}
