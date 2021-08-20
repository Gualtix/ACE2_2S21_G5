//*********************************************************************************************IMPORTACION DE LIBRERIA
#include <DHT.h>
//*********************************************************************************************DEFINICION DE PINES 
//*****************************************PINES TEMPERATURA Y HUMEDAD
#define DHTPIN 7
#define DHTTYPE DHT11
//*****************************************PINES DIRECCION
#define A_North A0
//#define A_NorthEast A1 SE QUEMÓ :(
#define A_East A1
#define A_SouthEast A2
#define A_South A3
#define A_SouthWest A4
#define A_West A5
#define A_NorthWest A6
//*****************************************PINES VELOCIDAD
#define anemometer 50

//*********************************************************************************************DEFINICION DE VARIABLES
//*****************************************INFORMACION
String data;
bool temperature;
bool velocidad;
//*****************************************TEMPERATURA Y HUMEDAD
DHT dht(DHTPIN, DHTTYPE);
//*****************************************DIRECCION
int last_windDir = 1;
int current_windDir = 8;
//*****************************************VELOCIDAD
long frequency = 0;
int measures_per_second = 100;
int dly = 1000/measures_per_second;
int tmp_time = 0;
int seconds  = 0;
long cnt = 0 ;
//TRUE = HIGH
int tmp_old_value = HIGH;


//*********************************************************************************************SETUP
void setup() {
  //*****************************************INICIALIZACION SERIAL
  Serial.begin(9600);
  //*****************************************INICIALIZACION PINES
  dht.begin();
  pinMode(anemometer,INPUT);
  //*****************************************INICIALIZACION DE VARIABLES DE DATA
  data = "";
  temperature = false;
  velocidad = false;
}

//*********************************************************************************************LOOP
void loop() {
  data.concat("{");
  //*****************************************TEMPERATURA Y HUMEDAD
  Temperatura_Humedad();
  //*****************************************VELOCIDAD
  if(temperature)Velocity();
  //*****************************************DIRECCION
  if(temperature && velocidad) getWindDirection();
  data.concat("}");
  Serial.println(data);
  delayMicroseconds(500);
  //*****************************************REINICIO DE DATA
  data = "";
  temperature = false;
  velocidad = false;
}


//*********************************************************************************************TEMPERATURA Y HUMEDAD
void Temperatura_Humedad()
{
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (!isnan(h) && !isnan(t)) {
    return;
  }
  //*****************************************HUMEDAD
  data.concat("\"Humedad\":");
  data.concat(String(h,4));
  data.concat(",");
  //*****************************************TEMPERATURA
  data.concat("\"Temperatura\":");
  data.concat(String(t,4));
  temperature = true;
}


//*********************************************************************************************DIRECCION DEL VIENTO
void getWindDirection() 
{
  //*****************************************DIRECCION
  data.concat(",");
  data.concat("\"Direccion\":");
  if (analogRead(A_North) <= 525) {
    last_windDir = current_windDir;
    current_windDir = 1;
    data.concat("\"N\"");
  } else if (analogRead(A_East) <= 500) {
    last_windDir = current_windDir;
    current_windDir = 3;
    data.concat("\"E\"");
  } else if (analogRead(A_SouthEast) < 510) {
    last_windDir = current_windDir;
    current_windDir = 4;
    data.concat("\"SE\"");
  } else if (analogRead(A_South) <= 523) {
    last_windDir = current_windDir;
    current_windDir = 5;
    data.concat("\"S\"");
  } else if (analogRead(A_SouthWest) < 526) {
    last_windDir = current_windDir;
    current_windDir = 6;
    data.concat("\"SO\"");
  } else if (analogRead(A_West) <= 510) {
    last_windDir = current_windDir;
    current_windDir = 7;
    data.concat("\"O\"");
  } else if (analogRead(A_NorthWest) < 510) {
    last_windDir = current_windDir;
    current_windDir = 8;
    data.concat("\"NO\"");
  } else {
    if (last_windDir == 8 && current_windDir == 1) {
      last_windDir = current_windDir;
      current_windDir = 2;
      data.concat("\"NE\"");
    } else if (current_windDir == 4 && last_windDir == 3) {
      last_windDir = current_windDir;
      current_windDir = 2;
      data.concat("\"NE\"");
    }
  }
}


//*********************************************************************************************VELOCIDAD DEL VIENTO
void Velocity() 
{
  //*****************************************VELOCIDAD
  tmp_time = millis();
  while(1){
    int tmp_gap = millis() - tmp_time;
    if(tmp_gap <= 1000){
      int tmp = digitalRead(anemometer);
      if(tmp_old_value != tmp){
        frequency++;
        tmp_old_value = tmp;
      }
    }
    if(tmp_gap >= 1000){
      int ajuste = frequency / 4;
      int rpm = (ajuste * 60);
      int diameter = 15;
      int kmph = (diameter) * (rpm) * (0.001885);
      data.concat(",");
      data.concat("\"Velocidad\":");
      data.concat(String(kmph,4));
      velocidad = true;
      frequency = 0;
      cnt = 0;
      break;
    }
  }
}
