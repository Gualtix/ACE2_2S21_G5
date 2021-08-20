//USB PORT: COM6
int anemometer = 50;
long frequency = 0;

int measures_per_second = 100;
int dly = 1000/measures_per_second;

int tmp_time = 0;
int seconds  = 0;
long cnt = 0 ;

//TRUE = HIGH

int tmp_old_value = HIGH;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(anemometer,INPUT);
  
}

void loop() {  

  tmp_time = millis();

  //ONE SECOND LOOP
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
      //Serial.println(frequency);
      int ajuste = frequency / 4;
      int rpm = (ajuste * 60);
      int diameter = 15;
      int kmph = (diameter) * (rpm) * (0.001885);
      Serial.println(kmph + "Km/h");
      frequency = 0;
      cnt = 0;
      break;
    }
  }
}
