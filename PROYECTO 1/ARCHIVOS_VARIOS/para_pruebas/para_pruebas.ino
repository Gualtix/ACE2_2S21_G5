bool si;
float peso;
int contador;
String data;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  si = true;
  peso = 0;
  contador = 0;
  data = "";
}

void loop() {
  // put your main code here, to run repeatedly:
  datas();
  Serial.println(data);
  data = "";
  delay(1000);
  contador++;
  if(contador%2==0)si = !si;
}

void datas()
{
  if(si)
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
