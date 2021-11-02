  //PIN: 40 -> SENSOR DE ESPALDA A
  int sen_a = 40;
  
  //PIN: 41 -> SENSOR DE ESPALDA B
  int sen_b = 41;
  
  //PIN: 42 -> BUZZER
  int buzzer = 42;
  
  //PIN: 50 -> ROJO
  int rojo = 50;
  
  //PIN: 51 -> AMARILLO
  int amarillo = 51;
  
  //PIN: 52 -> VERDE
  int verde = 52;

void setup(){
  
  
  pinMode(sen_a, INPUT);
  pinMode(sen_b, INPUT);
  pinMode(buzzer, OUTPUT);
  
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);

  digitalWrite(rojo, HIGH);
  digitalWrite(amarillo, HIGH);
  digitalWrite(verde, HIGH);

  
  
  Serial.begin(9600);
}
void loop(){  

  int val_a = digitalRead(sen_a);
  int val_b = digitalRead(sen_b);
  
  if(val_a ^ val_b){
    digitalWrite(buzzer, HIGH);
  }
  else{
    digitalWrite(buzzer, LOW);
  }

  int color = 0;
  color = Serial.read();

  //0 es rojo
  if(color == 48){
    digitalWrite(rojo, LOW);
    digitalWrite(amarillo, HIGH);
    digitalWrite(verde, HIGH);
  }

  //1 amarillo
  if(color == 49){
    digitalWrite(rojo, HIGH);
    digitalWrite(amarillo, LOW);
    digitalWrite(verde, HIGH);
  }

  //2 verde
  if(color == 50){
    digitalWrite(rojo, HIGH);
    digitalWrite(amarillo, HIGH);
    digitalWrite(verde, LOW);
  }

  Serial.write("holalolis :v\n");

  int period = 100;
  unsigned long time_now = 0;
  time_now = millis();   
  while(millis() < time_now + period){
    
  } 
}
