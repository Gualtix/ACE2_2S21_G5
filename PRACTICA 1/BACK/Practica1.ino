void setup() {
  Serial.begin(9600); // Starts the serial communication
}

void loop() {
  Serial.println("hello from arduino!");
  delay(1000);
}