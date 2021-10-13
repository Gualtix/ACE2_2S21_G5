var viento;
var n   = 0;
var n_h = 200;
var pos = 0;
var lg  = 0;

var gds = [348,341,335,328,322,315,309,302,296,288,282,275,269,262,256,248,242,235,228,221,215,208,202,194,188,182,175,168,162,155,149,141,135,128,122,115,108,102,95,88,82,75,69,62,55,48,42,35,28]
var dir = ["norte","sur","este","oeste","noreste","sureste","suroeste","noroeste"]
var rot = 0;
var gas = 0;

var station;

var snap = 
{
    "porcentaje_humedad":95,
    "celcius_temperatura":75,      //Enviar Medida en Grados Celcius
    "kmh_viento":75,               //Enviar Medida en Kilometros por Hora
    "direccion_viento":"noreste",  //norte, nordeste,este,sudeste,sur,suroeste,oeste noreste
    "lumenes": 75,  
};

document.addEventListener("DOMContentLoaded", function(event) {
    //viento = new Wind();
    station = new Wind(); 
    n = 0;
    document.getElementById("indic").style.top = gds[0]+'px';
    document.getElementById("agun").style.transform = "rotate(-140deg)";  
    
    $(function(){
        Dots.generate();
    });

    fetch_data();

    //viento.fetch_data();
        
});

function middle(params) {
    //Math.random() * (max - min) + min;

    var tmp_dir = Math.floor(Math.random()*(7-0) + 0);

    var celcius_temperatura = Math.floor(Math.random()*(48-0) + 0);
    var direccion_viento  = dir[tmp_dir];
    var kmh_viento = Math.floor(Math.random()*(200-0) + 0);
    var lumenes = Math.floor(Math.random()*(1500-0) + 0);
    var porcentaje_humedad = Math.floor(Math.random()*(100-0) + 0);

    station.update_temperature(celcius_temperatura);
    station.update_point(direccion_viento);
    station.update_speed(kmh_viento);
    station.update_light(lumenes);
    station.update_humidity(porcentaje_humedad);
}

function fetch_data() {
    setInterval(middle,1000);
}


class Wind {

    constructor()   
    {

    }
    
    test(){

        //Math.random() * (max - min) + min;
        snap.celcius_temperatura = Math.floor(Math.random()*(48-0) + 0);
        console.log(snap.celcius_temperatura);
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

  
    
    

    fetch_data(){

        /*
        var celcius_temperatura;
        setInterval(function () {
            celcius_temperatura = Math.floor(Math.random()*(48-0) + 0);
            update_temperature(celcius_temperatura);
        }, 100);
        */

          

        /*
        var cnt = 0;
        while(cnt < 15){

            this.sleep(1000);
            console.log("hola"); 
            cnt++;
        }



        ///cnt++;

        //var cnt = 0;
        //while(cnt < 15){  

            

        
        /*
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var jsonResponse = JSON.parse(this.responseText);

            }
        };
    
        request.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
        request.send();
        */
            //this.test();
            //this.update_temperature(snap.celcius_temperatura);

            //setTimeout(() => {console.log("1 Segundo esperado")}, 1000);
            

            //setTimeout(startTimer, delayInMilliseconds);
       // }
    }

    update_point(direccion_viento){

        var tmp = 0;
  
        //console.log(direccion_viento);
        //console.log("antes -> "+rot); 

        //Norte: 0 Grados
        if(direccion_viento == "norte"){
            tmp = 0;
        }

        //NorEste: 45  Grados
        if(direccion_viento == "noreste"){
            tmp = 45;
        }

        //Este: 90  Grados
        if(direccion_viento == "este"){
            tmp = 90;
        }

        //SurEste: 135   Grados
        if(direccion_viento == "sureste"){
            tmp = 135;
        }

        //Sur: 180   Grados
        if(direccion_viento == "sur"){
            tmp = 180;
        }

        //SurOeste: 225   Grados
        if(direccion_viento == "suroeste"){
            tmp = 225;
        }

        //Oeste: 270   Grados
        if(direccion_viento == "oeste"){
            tmp = 270;
        }

        //NorOeste: 315   Grados
        if(direccion_viento == "noroeste"){
            tmp = 315;
        }


        if(rot < tmp){
            rot = rot + (tmp-rot);
        }
        if(rot > tmp){
            rot = rot - (rot - tmp);
        }

        document.getElementById("point").style.transform = "rotate("+rot+"deg)";
        document.getElementById("txt_wind").innerHTML = direccion_viento;
    }

    update_light(lumenes){

        var pert = (lumenes / 1500);
        document.getElementById("resp").style.opacity = pert;
        document.getElementById("txt_light").innerHTML = lumenes;
    }

    update_temperature(celcius_temperatura){

        var tmp = celcius_temperatura;
        //console.log(tmp);

        if(tmp < 0){
            tmp = 0;
        }

        if(tmp > 48){
            tmp = 48;
        }    

        document.getElementById("txt_temperature").innerHTML = tmp + " °C";
        document.getElementById("indic").style.top = gds[tmp] + 'px';
    }

    update_speed(kmh_viento){
        var xp = (kmh_viento * 1.4);
        gas = -140 + xp;
        document.getElementById("agun").style.transform = "rotate("+gas+"deg)";
        document.getElementById("txt_speed").innerHTML = kmh_viento + " km/h";
    }

    update_humidity(humidity){

        /*
        n_h = n_h + (tm * 10);

        if(n_h < 10){
            n_h = 10;
        }

        if(n_h > 200){
            n_h = 200;
        }
        */

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var cols = "#" + randomColor;
        //console.log(cols);

        document.getElementById("txt_humidity").innerHTML = humidity + " %";
        
        $(function(){
            Dots.generate({
                selector: '.moving-circles',
                accurancy: humidity,
                color: cols,
            });
        });
        
        //document.getElementById("hb").remove();
        //document.getElementById("hb") = null;

        /*
        $( "hb" ).empty();
        //document.getElementById("hb").innerHTML("");
        var tx = document.getElementById("hb");
        document.getElementById("humidity").removeChild(tx);
        tx.remove();
        tx = null;  
        
        var element = document.createElement("div");
        element.classList.add('moving-circles');
        element.id = "hb"
        element.style.border = '2px solid red'; 
        element.style.height = '300px';
        element.style.width = '300px';
        element.style.backgroundColor = 'white';
        document.getElementById("humidity").appendChild(element);
        */
        

    }
}

