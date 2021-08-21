import processing.serial.*;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

Serial port;
String val;
String Prueba = "{Humedad:74.0000,Temperatura:23.4000,Viento:28.400,Direccion:N}";
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
float humedadDec = 20;
int perHumedad = int(humedadDec);
float r = 190;
float centX, centY;
float[] posX = new float[perHumedad];
float[] posY = new float[perHumedad];


String post = "http://localhost:8990/inforClimate";


void setup() {
  size(1200, 900); //size of the screen
  smooth();

  //================================================
  port = new Serial(this, "COM3", 9600); // segundo parametro es el puerto que usa Arduino
  port.bufferUntil('\n'); // mantiene datos hasta encontrar salto de linea. en caso que no sirva cambiar por }
  //-------- FONTS ---------------------------------

  font = loadFont("AbyssinicaSIL-Regular-48.vlw");
  fontTemp = loadFont("Uroob-Regular-48.vlw");

  //============================================
  humedadDec = float(0); // guarda en las variables la informacion
  vel =float(0);
  dir = "N";

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
  try
  {
    while (port.available() >0) {
      String inBuffer = port.readString().replace("\n", ""); // guarda en una string la cadena enviada
      URL url = new URL(post);
      HttpURLConnection con = (HttpURLConnection)url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("Content-Type", "application/json; utf-8");
      con.setRequestProperty("Accept", "application/json");
      con.setDoOutput(true);
      OutputStream os = con.getOutputStream();
      OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");    
      osw.write(inBuffer);
      osw.flush();
      osw.close();
      os.close();  //don't forget to close the OutputStream
      con.connect();
      
      //RESPUESTA
      BufferedReader br = new BufferedReader(
        new InputStreamReader(con.getInputStream(), "utf-8"));
      StringBuilder response = new StringBuilder();
      String responseLine = null;
      while ((responseLine = br.readLine()) != null) {
        response.append(responseLine.trim());
      }
      System.out.println(response.toString());

      if (inBuffer.charAt(0) == '{' && inBuffer.charAt(inBuffer.length()-2) == '}')
      {
        inBuffer = inBuffer.replace("{", ""); // elimina los caracteres {} 
        inBuffer = inBuffer.replace("}", ""); 
        inBuffer = inBuffer.replace("\"", "");
        if (inBuffer != null) { //si la cadena no viene vacia
          String[] information = splitTokens(inBuffer, ":,"); // separará la informacion si viene salto de linea, retorno o espacio. Lo agrega a una lista
          if (information.length == 8) 
          {
            if (information[0].equals("Humedad") && information[2].equals("Temperatura") && information[4].equals("Viento") && information[6].equals("Direccion")) {
              humedadDec = float(information[1]); // guarda en las variables la informacion
              temperatura = float(information[3]);
              vel = float(information[5]);
              dir = information[7];
            } else {
              //Do Nothing
              humedadDec = float(0); // guarda en las variables la informacion
              humedad();
              vel =float(0);
              dir = "N";
            }
          } else
          {
            humedadDec = float(0); // guarda en las variables la informacion
            temperatura = float(0);
            vel =float(0);
            dir = "N";
          }
        }
      }
    }
  }
  catch(Exception e) {
  }
  delay(1000);
}
