import React,{Component} from "react";
import axios from 'axios';
import Environment from '../environment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default class Configuraciones extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Nombre:'',
            Ubicacion:'',
            Silla: ''
        }
        this.url = Environment.HOST + ":" + Environment.PORT + "/usuario"
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})

    }

    submitHandler = e => {
        e.preventDefault()
        
        axios.post(this.url, this.state)
            .then(response => {
                if(response.data === "Registro Insertado!") Swal.fire('Registro Actualizado!', '', 'success')
                else Swal.fire('Error', 'Por favor intente de nuevo más tarde', 'error')
            }).catch(error => {
                Swal.fire('Error', 'Por favor intente de nuevo más tarde', 'error')
            })
    }

    render(){
        const {Nombre, Ubicacion, Silla} = this.state
        return(
            <div className="container">
                <form onSubmit = {this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="Nombre">Usuario:</label>
                        <input type="text" className="form-control" name="Nombre" aria-describedby="userHelp" placeholder="Nombre de usuario" value={Nombre} onChange={this.changeHandler}></input>
                        <small id="userHelp" className="form-text text-muted">Ingrese su nombre de usuario</small>

                    </div>


                    <div className="form-group">
                        <label htmlFor="Ubicacion">Ubicacion:</label>
                        <input type="text" className="form-control" name="Ubicacion" aria-describedby="ubicHelp" placeholder="Ubicacion" value={Ubicacion} onChange={this.changeHandler}></input>
                        <small id="ubicHelp" className="form-text text-muted">Ingrese la ubicación geográfica de la silla </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Silla">Identificador de silla:</label>
                        <input type="text" className="form-control" name="Silla" aria-describedby="idHelp" placeholder="Silla" value={Silla} onChange={this.changeHandler} ></input>
                        <small id="idHelp" className="form-text text-muted">identifique su silla</small>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Aceptar</button>
                </form>
                
            </div>
        )
    }
}