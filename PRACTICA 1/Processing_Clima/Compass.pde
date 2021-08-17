/*
GENERAL DOCUMENTATION OF COMPASS:
  Compass.pde Se encarga de graficar y verificar la dirección del viento por medio
  de la simulación de una brújula. Dependiendo de la entrada de arduino, este podrá
  

*/



void compass(boolean n, boolean s, boolean e, boolean o) {
  compss = loadImage("compass2.png"); // carga la imagen
  imageMode(CORNER); // la coloca en posicion de esquina
  compss.resize(380, 370); // cambia el tamaño
  image(compss, 710, 490); // coloca la imagen en la pantalla

/* ifs son para poder determinar que sensor está activo, dependiendo 
del que haya sido detectado, su respectiva dirección será marcada*/
  if (n == true && s == false && e == false && o == false) {
    textFont(font, 38);
    fill(194, 30, 86);
    text(nor, 887, 480);
    drawArrow(n, s, e, o);
  } else if (n== false && s == true && e==false && o == false) {
    textFont(font, 38);
    fill(255);
    text(sur, 887, 890);
    drawArrow(n, s, e, o);
  } else if (n== false && s == false && e==true && o == false) {
    textFont(font, 38);
    fill(231, 243, 36);
    text(est, 1095, 693);
    drawArrow(n, s, e, o);
  } else if (n== false && s == false && e==false && o == true) {
    textFont(font, 38);
    fill(36, 105, 243);
    text(oes, 690, 693);
    drawArrow(n, s, e, o);
  } else if (n== true && s == false && e==true && o == false) {
    textFont(font, 38);
    fill(241, 159, 19);
    text(nor+est, 1010, 540);
    drawArrow(n, s, e, o);
  } else if (n== true && s == false && e==false && o == true) {
    textFont(font, 38);
    fill(36, 243, 114);
    text(nor+oes, 730, 540);
    drawArrow(n, s, e, o);
  } else if (n== false && s == true && e==true && o == false) {
    textFont(font, 38);
    fill(248, 250, 159);
    text(sur+est, 1020, 800);
    drawArrow(n, s, e, o);
  } else if (n== false && s == true && e==false && o == true) {
    textFont(font, 38);
    fill(180, 217, 251);
    text(sur+oes, 720, 800);
    drawArrow(n, s, e, o);
  } else { // en caso que ningun sensor sea activado, las posiciones serán mostradas
    textFont(font, 38);
    text(nor, 887, 480);
    text(sur, 887, 890);
    text(oes, 690, 693);
    text(est, 1095, 693);
    text(nor+est, 1010, 540);
    text(nor+oes, 730, 540);
    text(sur+est, 1020, 800);
    text(sur+oes, 720, 800);
    drawArrow(n, s, e, o);
  }
}


/* Draw arrow carga la imagen de la flecha y la posiciona segun los sensores activos*/
void drawArrow(boolean n, boolean s, boolean e, boolean w ) {

  arrow = loadImage("arrow.png"); // carga la imagen
 
  imageMode(CENTER); //la posiciona en el centro
  arrow.resize(100, 100); //cambia tamaño
  translate(900, 670); // la mueve a esta posicion respecto a la esquina superior izquierda (0,0)

  if (n == true && s == false && e == false && w == false) { // north
    image(arrow, 0, 0);
  } else if (n== false && s == true && e==false && w == false) {//south
    rotate(3.21239);
    image(arrow, 0, 0);
  } else if (n== false && s == false && e==true && w == false) {//east
    rotate(1.61239);
    image(arrow, 0, 0);
  } else if (n== false && s == false && e==false && w == true) { //west
    rotate(4.71239);
    image(arrow, 0, 0);
  } else if (n== true && s == false && e==false && w == true) { //north-west
    rotate(5.41239);
    image(arrow, 0, 0);
  } else if (n== true && s == false && e==true && w == false) { //north-east
    rotate(0.71239);
    image(arrow, 0, 0);
  } else if (n== false && s == true && e==true && w == false) { //south-east
    rotate(2.51239);
    image(arrow, 0, 0);
  } else if (n== false && s == true && e==false && w == true) { //south-west
    rotate(3.81239);
    image(arrow, 0, 0);
  } else {
    rotate(angle);
    image(arrow, 0, 0);
    angle = angle +0.01;
  }
}
