#include <DHT.h>

//Definicion de pines
#define DHTPIN 7
#define DHTTYPE DHT11

//Definicion de Variables
DHT dht(DHTPIN, DHTTYPE);
String data;


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
