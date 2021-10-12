var viento;
var n = 0;
var n_h = 200;
var pos = 0;
var lg = 0;
var psp = -140;
var gds = [348,341,335,328,322,315,309,302,296,288,282,275,269,262,256,248,242,235,228,221,215,208,202,194,188,182,175,168,162,155,149,141,135,128,122,115,108,102,95,88,82,75,69,62,55,48,42,35,28]

document.addEventListener("DOMContentLoaded", function(event) {
    viento = new Wind();
    n = 0;
    document.getElementById("indic").style.top = gds[0]+'px';
    document.getElementById("agun").style.transform = "rotate("+psp+"deg)";

    $(function(){
        Dots.generate();
    });
        
    //viento.update_point();
});

class Wind {

    constructor()   
    {

    }

    update_point(dg){
        pos = pos + dg;
        document.getElementById("point").style.transform = "rotate("+pos+"deg)";
    }

    update_light(dg){

        if(dg > 0){lg = lg + 0.1;} else{lg = lg + -0.1;}

        if(lg < 0){lg = 0;}

        if(lg > 1){lg = 1;}
        
        document.getElementById("resp").style.opacity = lg;
    }

    update_temperature(tm){
        n = n + tm;
        console.log(n)
        if(n < 0){
            n = 0;
        }

        if(n > 48){
            n = 48;
        }


        document.getElementById("txt_temperature").innerHTML = n + " °C";
        document.getElementById("indic").style.top = gds[n] + 'px';
        
    }

    update_speed(dg){

        psp = psp + dg;


        if(psp < -140){
            psp = -140;
        }

        if(psp > 140){ 
            psp = 140;
        }

        var tmp = 140 +(psp*1.4);
        document.getElementById("txt_speed").innerHTML = tmp + " Km/h";
        document.getElementById("agun").style.transform = "rotate("+psp+"deg)";
    }

    update_humidity(tm){

        n_h = n_h + (tm * 10);

        if(n_h < 10){
            n_h = 10;
        }

        if(n_h > 200){
            n_h = 200;
        }

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var cols = "#" + randomColor;
        console.log(cols);

        document.getElementById("txt_humidity").innerHTML = (n_h / 2) + " %";
        
        $(function(){
            Dots.generate({
                selector: '.moving-circles',
                accurancy: n_h,
                color: cols,
            });
        });
        
        //document.getElementById("hb").remove();
        //document.getElementById("hb") = null;

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
        

    }
}

