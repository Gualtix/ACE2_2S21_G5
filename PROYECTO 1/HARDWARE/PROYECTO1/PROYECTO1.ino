

//-----------------------------------------------------DEFINICION DE PINES
#define echoPin 22 //Pin 22 - Echo
#define trigPin 24 //Pin 24 - Trigger

//-----------------------------------------------------DEFINICION DE VARIABLES
long duration; 
int distance; 
bool en_silla;
String data= "";
float peso;

//-----------------------------------------------------MODELO DE DATOS A CONSTRUIR
//EN_SILLA= TRUE|FALSE -- identifica si se envia señal de que el usuario esta sentado
//PESO= 0 - 999.99 -- identifica el peso del usuario en KG, si no esta en silla enviar 0.

/*
 * 
 * { 'en_silla'=true, 'peso'=120.98 }
 * 
 * 
 */

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
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
  distance = duration * 0.034 / 2; 
  if(distance>0 && distance<60) en_silla = true;
}
