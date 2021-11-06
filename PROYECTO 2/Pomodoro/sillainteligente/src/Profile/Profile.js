import './Profile.css';
import Configuraciones from '../Configuraciones/configuraciones.js';
import Informacion from './informacion';

function Profile(){
    return(
        <div id="main-wrapper">
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
