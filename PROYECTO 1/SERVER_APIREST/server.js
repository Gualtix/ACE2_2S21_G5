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

    //USUARIO
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
				res.status(200).send('Registro Insertado!');
			})
			.catch(error => {
                console.error("Error al insertar un registro: ", error)
                res.status(404).send('No se han insertado datos');
            });
		}
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

    //DASHBOARD

    app.get('/Dashboard/Peso', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find( { en_silla: { $ne: false } }).toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            if(req.body.tipo == "semana")
            {
                res.status(200).json(Semana_Group_Peso(result));
            }
            else if(req.body.tipo == "mes")
            {
                res.status(200).json(Mes_Group_Peso(result));
            }
            else{
                res.status(200).json(Last_Group_Peso(result));
            }
        })
        .catch(error => console.error(error));
    });

    app.get('/Dashboard/Horas/Total', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            if(req.body.tipo == "semana")
            {
                res.status(200).json(Semana_Group_Info(result, req.body.option));
            }
            else if(req.body.tipo == "mes")
            {
                res.status(200).json(Mes_Group_Info(result, req.body.option));
            }
            else{
                res.status(200).json(Last_Group_Info(result, req.body.option));
            }
        })
        .catch(error => console.error(error));
    });

    app.get('/Dashboard/Levantar', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            if(req.body.tipo == "semana")
            {
                res.status(200).json(Semana_Group_Levantar(result, req.body.option));
            }
            else if(req.body.tipo == "mes")
            {
                res.status(200).json(Mes_Group_Levantar(result, req.body.option));
            }
            else{
                res.status(200).json(Last_Group_Levantar(result, req.body.option));
            }
        })
        .catch(error => console.error(error));
    });

    app.get('/Dashboard/Horas/Promedio', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            if(req.body.tipo == "semana")
            {
                res.status(200).json(Semana_Group_Promedio(result));
            }
            else if(req.body.tipo == "mes")
            {
                res.status(200).json(Mes_Group_Promedio(result));
            }
            else{
                res.status(200).json(Last_Group_Promedio(result));
            }
        })
        .catch(error => console.error(error));
    });

    app.get('/Dashboard/Semana', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Semana(result));
        })
        .catch(error => console.error(error));
    });

    //REPORTES Y GRAFICAS
    app.get('/Reportes/Uso/Grafica', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Uso_Silla(result));
        })
        .catch(error => console.error(error));
    });

    app.get('/Reportes/Uso/Historial', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Uso_Historial(result));
        })
        .catch(error => console.error(error));
    });

    app.get('/Reportes/Peso', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.findOne({}, {sort:{$natural:-1}}).toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json((result));
        })
        .catch(error => console.error(error));
    });

    app.get('/Reportes/Horario/Horario', (req, res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        coleccion.find().toArray()
        .then(result =>
        {
            console.log("Obtener datos!!");
            res.status(200).json(Horario_Semanal(result));
        })
        .catch(error => console.error(error));
    });


    //OTROS
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

Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

//DASHBOARD-PESO
function Last_Group_Peso(informacion){
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
                    value.contador = value.contador + 1;
                    peso = peso + lista[a].peso;
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Semana_Group_Peso(informacion){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Semana = new Date(element.fecha).getWeekNumber();
            lista.push(element);
        });
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
                    value.contador = value.contador + 1;
                    peso = peso + lista[a].peso;
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Mes_Group_Peso(informacion){
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
                    value.contador = value.contador + 1;
                    peso = peso + lista[a].peso;
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//DASHBOARDS-HORAS
function Last_Group_Info(informacion, option){
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
        var value = {
            contador: 0,
            horas: 0
        }

        if(option == "all")
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
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
                            value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        else
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Dia == Number(option))
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
                                value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Semana_Group_Info(informacion, option){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Semana = new Date(element.fecha).getWeekNumber();
            lista.push(element);
        });

        var value = {
            contador: 0,
            horas: 0
        }

        if(option=="all")
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
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
                            value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        else{
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Semana == Number(option))
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
                                value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Mes_Group_Info(informacion, option){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Mes = new Date(element.fecha).getMonth();
            lista.push(element);
        });
        var value = {
            contador: 0,
            horas: 0
        }

        if(option == "all")
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
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
                            value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        else
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Mes == Number(option))
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
                                value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//DASHBOARDS-LEVANTAR
function Last_Group_Levantar(informacion, option){
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
        var value = {
            contador: 0
        }

        if(option == "all")
        {
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].en_silla == false)
                {
                    for(var b = a+1; b<lista.length; b++ )
                    {
                        if(lista[b].en_silla == true)
                        {
                            value.contador = value.contador + 1;
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
            lista_aux.push(value);
        }
        else
        {
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Dia == Number(option))
                {
                    if(lista[a].en_silla == false)
                    {
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == true)
                            {
                                value.contador = value.contador + 1;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Semana_Group_Levantar(informacion, option){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Semana = new Date(element.fecha).getWeekNumber();
            lista.push(element);
        });

        var value = {
            contador: 0
        }

        if(option=="all")
        {
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].en_silla == false)
                {
                    for(var b = a+1; b<lista.length; b++ )
                    {
                        if(lista[b].en_silla == true)
                        {
                            value.contador = value.contador + 1;
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
            lista_aux.push(value);
        }
        else{
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Semana == Number(option))
                {
                    if(lista[a].en_silla == false)
                    {
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == true)
                            {
                                value.contador = value.contador + 1;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Mes_Group_Levantar(informacion, option){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Mes = new Date(element.fecha).getMonth();
            lista.push(element);
        });
        var value = {
            contador: 0
        }

        if(option == "all")
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].en_silla == false)
                {
                    peso = peso + lista[a].peso;
                    for(var b = a+1; b<lista.length; b++ )
                    {
                        if(lista[b].en_silla == true)
                        {
                            value.contador = value.contador + 1;
                            a = b;
                            break;
                        }
                    }
                    if(a==lista.length) break;
                }
            }
            lista_aux.push(value);
        }
        else
        {
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].Mes == Number(option))
                {
                    if(lista[a].en_silla == false)
                    {
                        peso = peso + lista[a].peso;
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == true)
                            {
                                value.contador = value.contador + 1;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//DASHBOARS-HORAS - PESO PROMEDIO
function Last_Group_Promedio(informacion){
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
        for(var dia = 0; dia<7; dia++)
        {
            var value = {
                contador: 0,
                horas: 0,
                
            }
            value.dia = getDia(dia)
            var peso = 0;
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].dia = dia)
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
                                value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }

            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            value.horas = (value.contador>0)?(value.horas/contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Semana_Group_Promedio(informacion){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Semana = new Date(element.fecha).getWeekNumber();
            lista.push(element);
        });

        for(var Semana= 0; Semana<53; Semana++)
        {
            var value = {
                contador: 0,
                horas: 0,
                semana: Semana
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
                                value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }

            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            value.horas = (value.contador>0)?(value.horas/contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

function Mes_Group_Promedio(informacion){
    try{

        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            element.Mes = new Date(element.fecha).getMonth();
            lista.push(element);
        });

        for(var Mes =0; Mes<12; Mes++)
        {
            var value = {
                contador: 0,
                horas: 0,
                mes: getMes(Mes)
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
                                value.horas = value.horas + (new Date(lista[b]).getTime() - new Date(lista[a].fecha).getTime())/216000
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            value.horas = (value.contador>0)?(value.horas/contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//DASHBOARS-SEMANA USO
function Semana(informacion){
    try{
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getDay()
            element.dia = (date_chair);
            lista.push(element);
        });

        for(var day = 0; day<7;day++)
        {
            let value = {
                dia: getDia(day),
                contador: 0
            }
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].dia == day)
                {
                    if(lista[a].en_silla == true)
                    {
                        for(var b = a+1; b<lista.length; b++ )
                        {
                            if(lista[b].en_silla == false)
                            {
                                value.contador = value.contador + 1;
                                a = b;
                                break;
                            }
                        }
                        if(a==lista.length) break;
                    }
                }
            }
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//REPORTES - DIA DE MAYOR USO
function Uso_Silla(informacion)
{
    try{
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        var actual = Date.now().getWeekNumber();
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getWeekNumber();
            if(actual == date_chair) lista.push(element);
        });
        for(var day = 0; day<7;day++)
        {
            let value = {
                dia: getDia(day),
                contador: 0
            }

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
            lista_aux.push(value);
        }
        var sumatoriaObjeto = lista_aux.reduce(function(acumulador, siguienteValor){
            return {
              contador: acumulador.contador + siguienteValor.contador
            };
          }, {contador: 0});
        var promedio = sumatoriaObjeto/lista_aux.length;
        lista_aux.forEach(element => {    
            element.promedio = promedio;
        });
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//REPORTES - HISTORIAL
function Uso_Historial(informacion)
{
    try{
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        var actual = Date.now().getWeekNumber();
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getWeekNumber();
            if(actual == date_chair) lista.push(element);
        });
        for(var day = 0; day<7;day++)
        {
            for(var a = 0; a<lista.length; a++)
            {
                if(lista[a].en_silla == true && lista[a].dia == lista_aux[day].dia)
                {
                    let value = {
                        dia: getDia(day)
                    }
                    value.fecha = new Date(lista[a].fecha).toLocaleDateString();
                    value.entrada = new Date(lista[a].fecha).toLocaleTimeString();
                    for(var b = a+1; b<lista.length; b++ )
                    {
                        if(lista[b].en_silla == false && lista[a].dia == lista_aux[day].dia)
                        {
                            value.salida = new Date(lista[b].fecha).toLocaleTimeString();
                            a = b;
                            break;
                        }
                    }
                    lista_aux.push(value);
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

//REPORTES - USO ACTUAL

function Horario_Semanal(informacion)
{
    try{
        const lista = []
        const lista_aux = []
        //listamos solo datos que necesitamos
        var actual = Date.now().getWeekNumber();
        informacion.forEach(element => {
            var date_chair = new Date(element.fecha).getWeekNumber();
            if(actual == date_chair) lista.push(element);
        });
        for(var hora = 0; hora<24;hora++)
        {
            let value = {
                contador: 0,
            }
            value.hora = hora;
            var dia_anterior = null;
            for(var a = 0; a<lista.length; a++)
            {
                var hora_actual = new Date(lista[a].fecha).getHours();
                if(hora_actual == hora)
                {
                    if(dia_anterior != lista[a].fecha)
                    {
                        if(lista[a].en_silla == true)
                        {
                            value.contador = value.contador + 1;
                            dia_anterior = lista[a].fecha
                        }
                    }
                }
            }
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

//OTROS

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
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }
        return lista_aux;
    } catch(error) {
        console.log(error)
        return [];
    }
}

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
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
            lista_aux.push(value);
        }

        return lista_aux;
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
            value.peso = (value.contador>0)?(peso/value.contador).toFixed(2): 0.00;
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

