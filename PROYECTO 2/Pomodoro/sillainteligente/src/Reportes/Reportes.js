import React from "react";
import DiasMayorUso from "./DiasMayorUso";
import DiasMenorUso from "./DiasMenoUso";
import HistorialTiempoUso from "./HistorialTiempoUso";
import HorarioUsito from "./Horario_Uso";
import PesoActual from "./PesoActual";


export default class Reportes extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      tipo: 'all',
      option: 'all',
      options: []
    };
    this.isSubscribedApp = false;
    this.update_data = this.update_data.bind(this);
    this.childTiempoUso = React.createRef();
    this.childPeso = React.createRef();
    this.childTiempoUsoGrafica = React.createRef();
    this.childGraficaLevantar = React.createRef();
  }



  async update_data()
  {
    try
    { 
      if(this.childTiempoUso.current != null)  this.childTiempoUso.current.update(this.state.tipo, this.state.option);
      if(this.childPeso.current != null)  this.childPeso.current.update(this.state.tipo);
      if(this.childTiempoUsoGrafica.current != null) this.childTiempoUsoGrafica.current.update(this.state.tipo);
      if(this.childGraficaLevantar.current != null) this.childGraficaLevantar.current.update(this.state.tipo, this.state.option);
    }
    catch(error){}
  }

  async componentDidMount() {
    try {
        this.isSubscribedApp = true;
        setInterval(this.update_data, 500);
    } catch (error) {
        console.log("Errores de render");
    }

  }
  setState = (state, callback) => {
      if (this.isSubscribedApp) {
        super.setState(state, callback);
      }
  }

  async componentWillUnmount() {
      this.isSubscribedApp = false;
      clearInterval(this.update_data);
  }

  render(){
   
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <h1>REPORTES y GRÁFICAS</h1>
            <br />

            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                  <h2>PESO DE LA PERSONA QUE HACE USO DE LA SILLA</h2>
                  <div className="row">
                      <div className="col-lg-12 col-md-12">
                          <PesoActual />
                      </div>
                  </div>
              </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <h2>TIEMPO DE USO DE LA SILLA </h2>
                    <br />
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-lg-6">
                            <DiasMayorUso />
                        </div>
                        <div className="col-md-6 col-sm-12 col-lg-6">
                            <DiasMenorUso />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <HistorialTiempoUso />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2>GRÁFICO DE TIEMPO DE USO </h2>
              <div className="col-md-12 col-sm-12 col-lg-12">
                  <div className="row">
                      <div className="Col-md-12 col-lg-12">
                          <HorarioUsito />
                        </div>  
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
