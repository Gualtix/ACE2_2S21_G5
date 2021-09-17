#include <HX711.h>

#define DEBUG_HX711

// Parámetro para calibrar el peso y el sensor
#define CALIBRACION 31000.0

//-----------------------------------------------------DEFINICION DE PINES
#define echoPin 53 //Pin 22 - Echo
#define trigPin 52 //Pin 24 - Trigger

//-----------------------------------------------------DEFINICION DE VARIABLES
long duration; 
int distance; 
bool en_silla = false;
String data= "";
float peso;

// Pin de datos y de reloj
byte pinData = 3;
byte pinClk = 2;

// Objeto HX711
HX711 bascula;

//-----------------------------------------------------MODELO DE DATOS A CONSTRUIR
//EN_SILLA= TRUE|FALSE -- identifica si se envia señal de que el usuario esta sentado
//PESO= 0 - 999.99 -- identifica el peso del usuario en KG, si no esta en silla enviar 0.

  /*
  * 
  * { 'en_silla'=true, 'peso'=120.98 }
  * 
  */

void setup() {
  // Iniciar comunicación serie
#ifdef DEBUG_HX711
  Serial.begin(9600);
  Serial.println("[HX7] Inicio del sensor HX711");
#endif

  // Iniciar sensor
  bascula.begin(pinData, pinClk);
  // Aplicar la calibración
  bascula.set_scale(CALIBRACION);
  // Iniciar la tara
  // No tiene que haber nada sobre el peso
  bascula.tare();

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  data = "";
}

void loop() {
  identificar();
  medir_peso();
  datas();
  delayMicroseconds(500);
  reset_data();
}


//-----------------------------------------------------REINICIO DE DATA
void reset_data()
{
  data = "";
  peso = 0;
}

//-----------------------------------------------------CONTRUCCION Y ENVIO DE DATA
void datas()
{
  if(en_silla)
  {
    data.concat("{");
    //*******************************************IDENTIFICAR
    data.concat("\"en_silla\":");
    data.concat(String("true"));
    data.concat(",");
    //*****************************************PESO
    data.concat("\"peso\":");
    data.concat(String(peso,4));
    data.concat("}");
  }
  else
  {
    data.concat("{");
    //*******************************************IDENTIFICAR
    data.concat("\"en_silla\":");
    data.concat(String("false"));
    data.concat(",");
    //*****************************************PESO
    data.concat("\"peso\":");
    data.concat(String(peso,4));
    data.concat("}");
  }
}

//-----------------------------------------------------MEDIR PESO
void medir_peso()
{
  if(en_silla)
  {
    Serial.print("[HX7] Leyendo: ");
    peso = (bascula.get_units() * -1);
    Serial.print(peso, 1);
    Serial.print(" Kg");
    Serial.println();
  }
}

//-----------------------------------------------------IDENTIFICAR
void identificar()
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  //(duracion*velocidad del sonido)/2
  //distance = duration * 0.034 / 2;
  distance = duration / 59;
  //if(distance>0 && distance<60) en_silla = true;
  en_silla = (distance > 0 && distance < 10) ? true : false;
  Serial.println(en_silla ? "Sentado" : "De pie");
}
