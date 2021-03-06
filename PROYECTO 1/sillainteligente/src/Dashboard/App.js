
import TiempoUso from '../Graficos/tiempo-uso/TiempoUso';
import Peso from '../Graficos/peso/Peso';
import Historial from '../Historial/Historial';
import React from "react";
import MayorUso from '../Graficos/MayorUso/MayorUso';
import MovimientoDia from '../Graficos/movimiento_dia/MovimientoDia';
import TiempoUsoGrafica from '../Graficos/tiempo-uso-grafica/TiempoUsoGrafica';
import GraficaLevantar from '../Graficos/grafica-levantar/GraficaLevantar';
import Informacion from '../Profile/informacion';

export default class App extends React.Component {

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
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleDropdownChangeOption = this.handleDropdownChangeOption.bind(this);
  }

  handleDropdownChangeOption(e) {
    this.setState({ option: e.target.value });
  }

  handleDropdownChange(e) {
    
    if(e.target.value === "Mes")
    {
      const meses = [...Array(12).keys()]
      this.setState({options: meses})
      this.setState({ tipo: "mes" });
    }
    else if(e.target.value === "Semana")
    {
      const meses = [...Array(53).keys()]
      this.setState({options: meses})
      this.setState({ tipo: "semana" });
    }
    else
    {
      this.setState({ tipo: "all" });
      this.setState({ option: "all" });
    }
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
    const opciones = ['Ultima Semana', 'Semana', 'Mes']
    
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <h1>INFORMACI??N</h1>
            <br />
            <div className="card border-dark mb-3">
              <div className="card-body">
                  <Informacion />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <h1>INFORMACI??N DE USO</h1>
            <br />
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-lg-12">
                    <select id="opciones" onChange={this.handleDropdownChange}>
                      {opciones.map(
                            (variant) => (
                              <option key={variant} value={variant}>{variant}</option>
                            ),
                      )}
                    </select>
                    &nbsp; &nbsp;
                    {this.state.tipo !== "all" && <strong>Opcion &nbsp;</strong>}
                    {this.state.tipo !== "all" && <select id="value" onChange={this.handleDropdownChangeOption}>{this.state.options.map((variant) => (<option key={variant} value={variant}>{variant}</option>),)}</select>}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-4 col-sm-12 col-lg-4">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <MovimientoDia />
                  </div>
                </div> 
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <TiempoUso ref={this.childTiempoUso}/>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-12 col-lg-8">
                <Peso ref={this.childPeso}/>    
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <MayorUso />  
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12 col-lg-6">
                <TiempoUsoGrafica ref={this.childTiempoUsoGrafica} />  
              </div>
              <div className="col-md-6 col-sm-12 col-lg-6">
                <GraficaLevantar ref={this.childGraficaLevantar} />
              </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12">
                    <h1>HISTORICO DEL DIA</h1>
                    <br />
                    <Historial />
                </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
