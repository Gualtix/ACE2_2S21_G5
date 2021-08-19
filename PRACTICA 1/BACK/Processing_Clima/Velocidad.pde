// similar a la flecha de la brujula
float velocidadViento(float vel) {
  String texto = str(vel);
  textFont(fontTemp, 28); // fuente para mostrar la temperatura
  fill(255); // el color de letra -> blanco
  text(texto + " m/s", 500, 500);
  papalote = loadImage("reilete.png");
  imageMode(CENTER);
  papalote.resize(400, 400);
  translate(255, 680);
  rotate(spin);
  image(papalote, 0, 0);
  spin = spin +vel/100;
  return vel;
}
