import processing.serial.*;

Serial port;
String val;
String Prueba = "{\"Humedad\":74.0000,\"Temperatura\":23.4000,\"Viento\":28.400,\"Direccion\":\"N\"}";
// ************* TEXT*******************************
PFont font, fontTemp;
//**************WIND RELATED**************************
PImage compss, arrow, papalote;

float angle =0; // angle of the arrow
float spin = 0; // spin of the windmill
float vel;
float prevTemp = 0; // comparison variable
String dir;
String nor = "N";
String sur = "S";
String oes = "O";
String est = "E";
//************TEMPERATURE*****************************
int red = 0;
int blue = 0;
int green = 0;
int hot = 68;
float temperatura;
//****************************************************

// 70.4
float humedadDec=20;
int perHumedad = int(humedadDec);
float r = 190;
float centX, centY;
float[] posX = new float[perHumedad];
float[] posY = new float[perHumedad];


void setup() {
  size(1200, 900); //size of the screen
  smooth();

  //================================================
   port = new Serial(this, "puerto",9600); // segundo parametro es el puerto que usa Arduino
   port.bufferUntil('\n'); // mantiene datos hasta encontrar salto de linea. en caso que no sirva cambiar por }
  //-------- FONTS ---------------------------------

  font = loadFont("AbyssinicaSIL-Regular-48.vlw");
  fontTemp = loadFont("Uroob-Regular-48.vlw");

  //============================================
  centX = 900;
  centY = 225;
  humedad();
}


void draw() { // this is eq. of loop()
  serialCom();
  frames();
  drawGraphics();
 
}

void drawGraphics() {
  temperatura();
  drawHumedad();
  pushMatrix(); // guarda la tabla de posiciones 
  compass(dir); // north, south,east, west
  popMatrix(); // reestablece la tabla
  pushMatrix();
  velocidadViento(vel);
  popMatrix();
}

void frames() { // drawing the separators
  stroke(200);
  background(51); // dark gray
  line(0, height/2, width, height/2); // horizontal line
  line(width/2, 0, width/2, height); // vertical line
}


void serialCom() {
  while (port.available() >0) {
    String inBuffer = port.readString(); // guarda en una string la cadena enviada
    inBuffer = inBuffer.replace("{",""); // elimina los caracteres {} 
    inBuffer = inBuffer.replace("}",""); 
    if (inBuffer != null) { //si la cadena no viene vacia
      String[] information = splitTokens(inBuffer, ":,"); // separará la informacion si viene salto de linea, retorno o espacio. Lo agrega a una lista
      if (information[0].equals("\"Humedad\"") && information[2].equals("\"Temperatura\"") && information[4].equals("\"Viento\"") && information[6].equals("\"Direccion\"")) {
        humedadDec = float(information[1]); // guarda en las variables la informacion
        temperatura = float(information[3]);
        vel = float(information[5]);
        dir = information[7];
     
      }else{
        //Do Nothing
      }
    }
  }
}
