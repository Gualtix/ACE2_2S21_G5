#include <HX711.h>

#define DEBUG_HX711

// ========== ========== ========== CALIBRAR PESO Y SENSOR
#define CALIBRACION 30000.0

// ========== ========== ========== DEFINICION DE PINES
// #define echoPin 53  //Pin 22 - Echo
// #define trigPin 52  //Pin 24 - Trigger

// ========== ========== ========== DEFINICION DE VARIABLES
// long duration; 
// int distance; 
bool en_silla = false;
String data= "";
float peso;

int sen_a = 26;     //PIN: 40 -> SENSOR DE ESPALDA A
int sen_b = 22;     //PIN: 41 -> SENSOR DE ESPALDA B

int buzzer = 24;    //PIN: 42 -> BUZZER

int rojo = 30;      //PIN: 50 -> ROJO
int amarillo = 34;  //PIN: 51 -> AMARILLO
int verde = 32;     //PIN: 52 -> VERDE

// Pin de datos y de reloj
byte pinData = 7;
byte pinClk = 6;

// Objeto HX711
HX711 bascula;

// ========== ========== ========== MODELO DE DATOS A CONSTRUIR
//EN_SILLA= TRUE|FALSE -- identifica si se envia señal de que el usuario esta sentado
//PESO= 0 - 999.99 -- identifica el peso del usuario en KG, si no esta en silla enviar 0.

  /*
  * 
  * { 'en_silla'=true, 'peso'=120.98 }
  * 
  */

void setup() {
  // Iniciar comunicación serie
  Serial.begin(9600);
  
  // Iniciar sensor
  bascula.begin(pinData, pinClk);
  // Aplicar la calibración
  bascula.set_scale(CALIBRACION);
  // Iniciar la tara
  // No tiene que haber nada sobre el peso
  bascula.tare();

  pinMode(sen_a, INPUT);
  pinMode(sen_b, INPUT);
  pinMode(buzzer, OUTPUT);
  
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);

  digitalWrite(rojo, HIGH);
  digitalWrite(amarillo, HIGH);
  digitalWrite(verde, HIGH);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  data = "";
}

void loop() {
  identificar();
  medir_peso();
  datas();
  Serial.println(data);
  delayMicroseconds(1000);
  reset_data();
}

// ========== ========== ========== REINICIO DE DATA
void reset_data()
{
  data = "";
  peso = 0;
}

// ========== ========== ========== CONTRUCCION Y ENVIO DE DATA
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

// ========== ========== ========== MEDIR PESO
void medir_peso()
{
  if(en_silla)
  {
    peso = (bascula.get_units() * -1);
  }
  else
  {
    peso = 0.00;
  }
}

// ========== ========== ========== IDENTIFICAR
void identificar()
{
  int val_a = digitalRead(sen_a);
  int val_b = digitalRead(sen_b);

  if (val_a && val_b) {
    // ESTÁS BIEN SENTADO
    digitalWrite(buzzer, HIGH)
    en_silla = true
  }
  else if (val_a || val_b) {
    // ESTAS MAL SENTADO
    en_silla = true
  }
  else {
    // NO HAY NADIE
    digitalWrite(buzzer, LOW)
    en_silla = false
  }

  // digitalWrite(trigPin, LOW);
  // delayMicroseconds(2);
  // digitalWrite(trigPin, HIGH);
  // delayMicroseconds(10);
  // digitalWrite(trigPin, LOW);
  // duration = pulseIn(echoPin, HIGH);
  // distance = duration / 59;
  // en_silla = (distance > 0 && distance < 10) ? true : false;
}
