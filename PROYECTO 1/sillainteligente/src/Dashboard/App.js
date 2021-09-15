
import TiempoUso from '../Graficos/tiempo-uso/TiempoUso';
import Horario from '../Graficos/horario/Horario';
import Peso from '../Graficos/peso/Peso';
import Historial from '../Historial/Historial';
import Movimiento from '../Graficos/movimiento/Movimiento';

function App() {
  
  return (
    
    <div id="main-wrapper">
          <header className="fades">
            <nav>
               <div className="menu-icon">
                  <i className="fa fa-bars fa-2x"></i>
               </div>
               <div className="logo">
                  SMART CHAIR
               </div>
            </nav>
         </header>
         <div className="page-wrapper">
          <div className="container-fluid">
            <br />
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <h1>INFORMACIÓN</h1>
                <br />
                <div className="card border-dark mb-3">
                  <div className="card-body">
                      
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <h1>REPORTES DE USO</h1>
                <br />
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-lg-6">
                    <TiempoUso />
                  </div>
                  <div className="col-md-6 col-sm-12 col-lg-6">
                    <Peso />    
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-lg-6">
                    <Movimiento />  
                  </div>
                  <div className="col-md-6 col-sm-12 col-lg-6">
                    <Horario />
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <Historial />
                    </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
              © 2021 SMART CHAIR
          </footer>
        </div>
    </div>
  );
}

export default App;
