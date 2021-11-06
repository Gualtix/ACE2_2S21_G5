import React from "react";
import DatosArduino from "../Arduino/Arduino";
import { Link } from 'react-router-dom';

export default class Bd extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {};
  }

  render()
  {
    return (
    
        <div>
            <br />
                <nav className="menu1">
                    <ul>
                        <li style={{ color: 'black' }}><Link to="/">Home</Link></li>
                        <li><Link to="/Informacion">Información</Link></li>
                        <li><Link to="/Perfil">Perfil</Link></li>
                    </ul>
                </nav>
            <br/>
            <div className="container-fluid">

                
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-12">
                    <h1>DATA ARDUINO</h1>
                    <br />
                    <DatosArduino />
                    </div>
                </div>
            </div>
        </div>

      )
  }
}
