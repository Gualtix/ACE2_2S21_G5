import React,{Component} from "react";
import axios from 'axios';
import Environment from '../environment';

export default class Informacion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usuario:'',
            Ubicacion:'',
            uid: ''
        }
        this.isSubscribedinfo = false;
        this.url = Environment.HOST + ":" + Environment.PORT + "/usuario/informacion";
        this.getData = this.getData.bind(this)
    }

    async getData(){
        if(this.isSubscribedinfo)
        {
            try{
                axios.get(this.url,{})
                .then((response)=>{
                    if(response.data.length > 0){
                        this.setState({ usuario: response.data[0].Nombre_Usuario})
                        this.setState({ Ubicacion: response.data[0].Ubicacion})
                        this.setState({ uid: response.data[0].Silla})
                    }
                }).catch((error)=>{console.log(error)})
            }catch(error){}
        }
    }

    setState = (state, callback) => {
        if (this.isSubscribedinfo) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedinfo = true;
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedinfo = false;
        clearInterval(this.getData);
    }


    render(){
        
        return(
            <div className="container">
                <div className="table-responsive">
                    <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Nombre Usuario</th>
                            <td>{this.state.usuario}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ubicacion</th>
                            <td>{this.state.Ubicacion}</td>
                        </tr>
                        <tr>
                            <th scope="row">UID Silla</th>
                            <td>{this.state.uid}</td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
            </div>

        )
    }
}