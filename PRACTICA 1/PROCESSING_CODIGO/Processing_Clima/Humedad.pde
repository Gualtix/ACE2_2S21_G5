
void humedad(){
  
  for(int i=0; i<perHumedad;i++){
      posX[i] = centX;
      posY[i] = centY;
  }
  

}

void drawHumedad(){
  String texto = str(perHumedad);
  textFont(fontTemp, 28); // fuente para mostrar la temperatura
  fill(255); // el color de letra -> blanco
  text("La Humedad es: ",1050,70 );
  text(texto + " %", 1100, 100);
  // hace que las particulas puedan atravesar el circulo, desaparecer y reaparecer en el
  for (int i =0; i<perHumedad;i++){
    posX[i] += (noise(frameCount*0.01+i)-0.5)*15;
    posY[i] += (noise(frameCount*0.01+i+2)-0.5)*15;
    if(dist(centX,centY,posX[i],posY[i]) > r-10){
      float distX = posX[i] - centX;
      float distY = posY[i] - centY;
      posX[i] = centX - distX;
      posY[i] = centY - distY;
    }
    noStroke();
    fill(71, 114, (i*10)%360);
    ellipse(posX[i], posY[i], 10, 10);
  }
  noFill();
  stroke(200); //le da color blanco
  ellipse(centX,centY, r*2,r*2); // dibuja la elipse con la posicion y radios dados
  
}
