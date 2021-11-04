//*********************************************************************************************IMPORTACION DE LIBRERIA
#include <DHT.h>
//#include <SoftwareSerial.h>
//*********************************************************************************************DEFINICION DE PINES
//*****************************************PINES TEMPERATURA Y HUMEDAD
#define DHTPIN 7
#define DHTTYPE DHT11
//*****************************************PINES DIRECCION
#define A_North A0
//#define A_NorthEast A1 SE QUEMÓ :(
#define A_East A2
//#define A_SouthEast A2
#define A_South A1
//#define A_SouthWest A4
#define A_West A3
//#define A_NorthWest A6

#define VIN 5 // V power voltage
#define R 10000 //ohm resistance value

//*****************************************PINES VELOCIDAD
#define anemometer 50

//*****************************************CONFIGURACION BLUETOOTH
//SoftwareSerial miBT(10, 11); // RX, TX

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
int dly = 1000 / measures_per_second;
int tmp_time = 0;
int seconds = 0;
long cnt = 0;
//TRUE = HIGH
int tmp_old_value = HIGH;

//*********************************************************************************************LUMINOSIDAD
const long A = 1000;     //Resistencia en oscuridad en KΩ
const int B = 15; 
const int Rc = 10;
int V;
int ilum;
char val; // Variable que recibe data del puerto serial
const int LDRPin = A7;

//*********************************************************************************************SETUP
void setup()
{
  //*****************************************INICIALIZACION SERIAL
  Serial.begin(9600);
  //*****************************************INICIALIZACION PINES
  dht.begin();
  pinMode(anemometer, INPUT);
  //*****************************************INICIALIZACION DE VARIABLES DE DATA
  data = "";
  temperature = false;
  velocidad = false;
}

//*********************************************************************************************LOOP
void loop()
{
  
  data.concat("{");
  //*****************************************TEMPERATURA Y HUMEDAD
  Temperatura_Humedad();
  //*****************************************VELOCIDAD
  if(temperature)Velocity();
  //*****************************************DIRECCION
  if(temperature && velocidad) 
  {
    getWindDirection();
    luminosidad();
  }
  data.concat("}");
  Serial.println(data.c_str());
  delay(1000);
  //*****************************************REINICIO DE DATA
  data = "";
  temperature = false;
  velocidad = false;
  

  //delay(5000);

  // Enviar datos al bluetooth
  //miBT.println(data);
  // Enviar datos al serial para comprobar

}

//*********************************************************************************************TEMPERATURA Y HUMEDAD
void Temperatura_Humedad()
{
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t))
  {
    h = 0;
    t = 0;
  }
  //*****************************************HUMEDAD
  data.concat("\"humedad\":");
  data.concat(String(h, 4));
  data.concat(",");
  //*****************************************TEMPERATURA
  data.concat("\"temperatura\":");
  data.concat(String(t, 4));
  temperature = true;
}

//*********************************************************************************************DIRECCION DEL VIENTO
void getWindDirection()
{
  //*****************************************DIRECCION
  data.concat(",");
  data.concat("\"direccion\":");
  data.concat("\"norte\"");

  //Serial.println(analogRead(A_South));
  //Serial.println(analogRead(A_West));
  //Serial.println(analogRead(A_East));
/*
  if (analogRead(A_South) <= 510)
  {
    last_windDir = current_windDir;
    current_windDir = 5;
    data.concat("\"sur\"");
  }

  else if (analogRead(A_West) <= 510)
  {
    last_windDir = current_windDir;
    current_windDir = 1;
    data.concat("\"oeste\"");
  }
  else if (analogRead(A_East) <= 510)
  {
    last_windDir = current_windDir;
    current_windDir = 3;
    data.concat("\"este\"");
  }
  else
  {
    last_windDir = current_windDir;
    current_windDir = 7;
    data.concat("\"norte\"");
  }
  */
}

//*********************************************************************************************VELOCIDAD DEL VIENTO
void Velocity()
{
  //*****************************************VELOCIDAD
  tmp_time = millis();
  while (1)
  {
    int tmp_gap = millis() - tmp_time;
    if (tmp_gap <= 1000)
    {
      int tmp = digitalRead(anemometer);
      if (tmp_old_value != tmp)
      {
        frequency++;
        tmp_old_value = tmp;
      }
    }
    if (tmp_gap >= 1000)
    {
      int ajuste = frequency / 4;
      int rpm = (ajuste * 60);
      int diameter = 15;
      int kmph = (diameter) * (rpm) * (0.001885);
      
      data.concat(",");
      data.concat("\"velocidad\":");
      data.concat(String(kmph, 4));
      velocidad = true;
      frequency = 0;
      cnt = 0;
      break;
    }
  }
}

void luminosidad()
{
    V = analogRead(LDRPin);         
    //ilum = (((long)V*A*10)/((long)B*Rc*(1023-V)));  
    ilum = sensorRawToPhys(V);
    data.concat(",");
    data.concat("\"luminosidad\":");
    data.concat(String(ilum, 4));
}

int sensorRawToPhys(int raw){
  // Conversion rule
  float Vout = float(raw) * (VIN / float(1023));// Conversion analog to voltage
  float RLDR = (R * (VIN - Vout))/Vout; // Conversion voltage to resistance
  int phys=500/(RLDR/1000); // Conversion resitance to lumen
  return phys;
}
