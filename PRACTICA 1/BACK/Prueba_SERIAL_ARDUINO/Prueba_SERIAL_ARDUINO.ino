#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600); // Starts the serial communication
}

void loop() {
  char json[150] = {'\0'};
  json[0] = '{';
  json[1] = '\'';
  json[2] = 'T';
  json[3] = '\'';
  json[4] = ':';
  json[5] = '0';
  json[6] = '}';
  Serial.println(json);
  delay(1000);
}
