/*
GENERAL DOCUMENTATION OF COMPASS:
  Compass.pde Se encarga de graficar y verificar la dirección del viento por medio
  de la simulación de una brújula. Dependiendo de la entrada de arduino, este podrá
  

*/



void compass() {
  compss = loadImage("compass2.png"); // carga la imagen
  imageMode(CORNER); // la coloca en posicion de esquina
  compss.resize(380, 370); // cambia el tamaño
  image(compss, 710, 490); // coloca la imagen en la pantalla
  textFont(font, 38);
  text(nor, 887, 480);
  text(sur, 887, 890);
  text(oes, 690, 693);
  text(est, 1095, 693);
  text(nor+est, 1010, 540);
  text(nor+oes, 730, 540);
  text(sur+est, 1020, 800);
  text(sur+oes, 720, 800);
/* ifs son para poder determinar que sensor está activo, dependiendo 
del que haya sido detectado, su respectiva dirección será marcada*/
  switch(dir) //<>//
  {
    case 'n':
    case 'N':
      textFont(font, 38);
      fill(194, 30, 86);
      text(nor, 887, 480);
      break;
    case 's':
    case 'S':
      textFont(font, 38);
      fill(255);
      text(sur, 887, 890);
      break;
    case 'e':
    case 'E':
      textFont(font, 38);
      fill(231, 243, 36);
      text(est, 1095, 693);
      break;
    case 'o':
    case 'O':
      textFont(font, 38);
      fill(36, 105, 243);
      text(oes, 690, 693);
      break;
    default:

  }
}


/* Draw arrow carga la imagen de la flecha y la posiciona segun los sensores activos*/
void drawArrow() {
  arrow = loadImage("arrow.png"); // carga la imagen
  imageMode(CENTER); //la posiciona en el centro
  arrow.resize(100, 100); //cambia tamaño
  translate(900, 670); // la mueve a esta posicion respecto a la esquina superior izquierda (0,0)
  switch(dir)
  {
    case 'n':
    case 'N':
      rotate(0);
      image(arrow, 0, 0);
      break;
    case 's':
    case 'S':
      rotate(3.21239);
      image(arrow, 0, 0);
      break;
    case 'e':
    case 'E':
      rotate(1.61239);
      image(arrow, 0, 0);
      break;
    case 'o':
    case 'O':
      rotate(4.71239);
      image(arrow, 0, 0);
      break;
    default:
      rotate(angle);
      image(arrow, 0, 0);
      angle = angle +0.05;
  }
}
