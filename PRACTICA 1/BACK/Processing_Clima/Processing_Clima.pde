// ************* TEXT*******************************
PFont font, fontTemp;
//**************WIND RELATED**************************
PImage compss, arrow, papalote;

float angle =0; // angle of the arrow
float spin = 0; // spin of the windmill
float prevTemp = 0; // comparison variable

String nor = "N";
String sur = "S";
String oes = "O";
String est = "E";
//************TEMPERATURE*****************************
int red = 0;
int blue = 0;
int green = 0;
int hot = 68;
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
  //-------- FONTS ---------------------------------
  
  font = loadFont("AbyssinicaSIL-Regular-48.vlw");
  fontTemp = loadFont("Uroob-Regular-48.vlw");
  
  //============================================
  centX = 900;
  centY = 225;
  humedad();  
}


void draw() { // this is eq. of loop()
  
  frames(); 
  drawGraphics();
 
}

void drawGraphics(){
  temperatura();
  drawHumedad();
  pushMatrix();
  compass(false, false, false, false); // north, south,east, west
  popMatrix();
  pushMatrix();
  velocidadViento(10);
  popMatrix();
  
}

void frames() { // drawing the separators
  stroke(200);
  background(51); // dark gray
  line(0, height/2, width, height/2); // horizontal line
  line(width/2, 0, width/2, height); // vertical line
}
