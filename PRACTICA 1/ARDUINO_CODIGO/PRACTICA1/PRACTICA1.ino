#include <DHT.h>

//Definicion de pines
#define DHTPIN 7
#define DHTTYPE DHT11

#define A_North A0
//#define A_NorthEast A1 SE QUEMÓ :(
#define A_East A1
#define A_SouthEast A2
#define A_South A3
#define A_SouthWest A4
#define A_West A5
#define A_NorthWest A6

//Definicion de Variables
DHT dht(DHTPIN, DHTTYPE);
String data;

int last_windDir = 1;
int current_windDir = 8;

void setup() {
  // put your setup code here, to run once:
  //Inicializacion de Serial
  Serial.begin(9600);
  // Comenzamos el sensor DHT
  dht.begin();
  //Inicializamos las variables de data
  data = "";
}

void loop() {

  data.concat("{");
  Temperatura_Humedad();
  data.concat("}\n");
  Serial.println(data);
  delayMicroseconds(500);
  
  //getWindDirection(); // OBTIENE LA DIRECCIÓN DEL VIENTO
  //Serial.println(current_windDir); // IMPRIME LA DIRECCIÓN DEL VIENTO
}

void Temperatura_Humedad()
{
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    return;
  }
  // Calcular el índice de calor en grados centígrados
  float hic = dht.computeHeatIndex(t, h, false);
 
  //Humedad
  data.concat("\"Humedad\":");
  data.concat(String(h,4));
  data.concat(",");
  //Temperatura
  data.concat("\"Temperatura\":");
  data.concat(String(t,4));
  data.concat(",");
  /*
  //Indice de Calor
  data.concat(hic);
  */
}

void getWindDirection() {
  if (analogRead(A_North) <= 525) {
    last_windDir = current_windDir;
    current_windDir = 1;
  } else if (analogRead(A_East) <= 500) {
    last_windDir = current_windDir;
    current_windDir = 3;
  } else if (analogRead(A_SouthEast) < 510) {
    last_windDir = current_windDir;
    current_windDir = 4;
  } else if (analogRead(A_South) <= 523) {
    last_windDir = current_windDir;
    current_windDir = 5;
  } else if (analogRead(A_SouthWest) < 526) {
    last_windDir = current_windDir;
    current_windDir = 6;
  } else if (analogRead(A_West) <= 510) {
    last_windDir = current_windDir;
    current_windDir = 7;
  } else if (analogRead(A_NorthWest) < 510) {
    last_windDir = current_windDir;
    current_windDir = 8;
  } else {
    if (last_windDir == 8 && current_windDir == 1) {
      last_windDir = current_windDir;
      current_windDir = 2;
    } else if (current_windDir == 4 && last_windDir == 3) {
      last_windDir = current_windDir;
      current_windDir = 2
    }
  }
}
