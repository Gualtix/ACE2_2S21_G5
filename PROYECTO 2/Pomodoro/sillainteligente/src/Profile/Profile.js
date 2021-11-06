import './Profile.css';
import Configuraciones from '../Configuraciones/configuraciones.js';
import Informacion from './informacion';
import { Link } from 'react-router-dom';

function Profile(){
    return(
        <div id="main-wrapper">
            <br/>
            <nav className="menu1">
                <ul>
                    <li style={{ color: 'black' }}><Link to="/">Home</Link></li>
                    <li><Link to="/Informacion">Información</Link></li>
                    <li><Link to="/Perfil">Perfil</Link></li>
                </ul>
            </nav>
            <br />
            <div className = "page-wrapper">
                <div className= "container-fluid">
                    <Informacion/>
                    <br></br>
                    <div>
                       <Configuraciones/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
