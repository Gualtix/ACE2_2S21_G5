import React from 'react'
import { Link } from 'react-router-dom';


export default class Menu extends React.Component{
    constructor(props)
    {
       super(props);
       this.state = {};
    }
    render(){
        return(
            <header>
                <nav>
                <div className="menu-icon">
                    <i className="fa fa-bars fa-2x"></i>
                </div>
                <div className="logo">
                    SMART CHAIR
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Pomodoro">Pomodoro</Link></li>
                        <li><Link to="/Reporte">Reportes</Link></li>
                        <li><Link to="/Informacion">Información</Link></li>
                        <li><Link to="/Perfil">Perfil</Link></li>
                    </ul>
                </div>
                </nav>
            </header>    
        )
    }
}