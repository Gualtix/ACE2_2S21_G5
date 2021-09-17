import './Profile.css';
import Configuraciones from '../Configuraciones/configuraciones.js';

function Profile(){
    return(
        <div id="main-wrapper">
           
               
                    <div className="logo">
                        <br></br>
                     PREFIL DE CONFIGURACION
                     </div>
               

           
        
            <div className = "page-wrapper">
                <div className= "container-fluid">
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
