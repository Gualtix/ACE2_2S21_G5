/* Maneja el termometro de la aplicación, dependiendo de la temperatura
un color será mostrado en el círculo*/

void temperatura() {
  float temperatura = random(19, 24); // opcion temporal a falta de datos reales
  delay(100);
  //println(temperatura);// temperature simulation
  drawCircle(temperatura); // dibuja el circulo y maneja temperatura
}

/* como nota el cambio de color en la temperatura no podrá ser mostrado 
tan notoriamente ya que esta varia, si se mantiene en la misma temperatura el color 
se mantendrá, si sube el color cambiará ligeramente, al igual que cuando baje
*/

void drawCircle(float temperatura) { // float ya que el método rándom da valores con punto decimal de entre 5 y 6 decimales
  // descomentar si se tiene curiosidad de la temperatura anterior vs la actual
  println("Anterior: "+prevTemp + "    Temperatura Actual: " + temperatura );


  int auxiliar = int(temperatura); // convierte de float a int la temperatura
  String temp = str(auxiliar); // convierte de int a string para poder imprimir con text()


  if (int(prevTemp) < int(temperatura)) { 
    /* si la temperatura anterior es < que la actual esto significa que la temperatura
    va en aumento*/
    termostatoAlto(temperatura); // subiran los valores de color del círculo
    
  } else if (int(prevTemp) > int(temperatura)) {
    /*si la temperatura anterior es  > a la actual esto significa que la temperatura
    va disminuyendo*/
    termostatoBajo(temperatura); // bajarán los valores de color del círculo
    
  } else if (int(prevTemp) == int(temperatura)) {
    // temperatura constante, no es necesaria una acción
  } 



  stroke(0);// color del margen del círculo será negro
  circle(320, 220, 400); // dibuja círculo en x,y, radio

  textFont(fontTemp, 78); // fuente para mostrar la temperatura
  fill(255); // el color de letra -> blanco

  text(temp+" °C", 270, 250); // mostrará en pantalla el texto de temperatura
  prevTemp = temperatura; // saving prev. temp to compare and validate - used for colors
}

/* Sube los valores de temperatura dependiendo del color y rango de temperatura
en la que este esté*/

void termostatoAlto(float temperatura) {
  // CELESTE
  if (int(temperatura) > 10 && int(temperatura) <= 18) {
    // r = 2 b = 255 green cambia
    green += 20; // aumenta el verde para mostrar un gradiente en azúl
    fill(2, green, 255);
    //VERDE
  } else if (int(temperatura) > 18 && int(temperatura) <= 23) {
    // r = 5 g = 253 blue cambi
    blue += 20; // aumenta en azúl para mostrar un gradiente en verde
    fill(5, 253, blue);
    //NARANJA
  } else if (int(temperatura) > 23 && int(temperatura) <= 27) {
    // g 253 b = 5 red cambia
    red += 20;  // aumenta el rojo para mostrar un gradiente en amarillo o naranja
    fill(red, 253, 255);
    //ROJO
  } else if (int(temperatura) > 27 && int(temperatura) <= 35) {
    // r = 253, b = 5, green cambia
    green += 20; // aumenta en verde para mostrar un gradiente en rojo vibrante
    fill(253, green, 5);
  } else if (int(temperatura) > 35) {
    // r = 253 b = 5 green < 19
    hot -= 20; // si la temperatura excede los 35 grados el rojo baja para mostrar un rojo intenso
    fill(253, hot, 5);
  } else if (int(temperatura) < 10) {
    fill(138, 255, 255); // si la temperatura es muy baja se mantiene en celeste
  }
}


/* como el método anterior, este disminuirá  los respectivos valores para poder 
mostrar un gradiente en disminución*/
void termostatoBajo(float temperatura) {
  if (int(temperatura) > 10 && int(temperatura) <= 18) {
    // r = 2 b = 255 green cambia
    green -= 20;
    fill(2, green, 255);
  } else if (int(temperatura) > 18 && int(temperatura) <= 23) {
    // r = 5 g = 253 blue cambi
    blue -= 20;
    fill(5, 253, blue);
  } else if (int(temperatura) > 23 && int(temperatura) <= 27) {
    // g 253 b = 5 red cambia
    red -= 20;
    fill(red, 253, 255);
  } else if (int(temperatura) > 27 && int(temperatura) <= 35) {
    // r = 253, b = 5, green cambia
    green -= 20;
    fill(253, green, 5);
  } else if (int(temperatura) > 35) {
    // r = 253 b = 5 green < 19
    hot += 20;
    fill(253, hot, 5);
  } else if (int(temperatura) < 10) {
    fill(138, 255, 255);
  }
}
