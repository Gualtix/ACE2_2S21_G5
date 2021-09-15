import React, {Component} from "react";
import axios from 'axios';
import Environment from '../environment';
import TableDatos from "./TableHistorial";

export default class Movimiento extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            curTime: ''  
        };
        this.url = Environment.HOST + Environment.PORT;
        this.tableHeader = ["Fecha", "Tiempo de Uso", "Peso", "Entrada", "Salida"];
        this.getData = this.getData.bind(this);
        this.childInventarioP = React.createRef();
    }

    async getData(){
        axios.get(this.url,{})
        .then(
            (response)=>{
                if(response.data.length > 0){
                    var datito = [];
                    response.data.forEach((element)=>{
                        datito.push(element);
                    })

                    this.setState({data: datito});
                }
            }
        ).catch(err => {})
    }

    async componentDidMount() {
        try {
            setInterval( () => {
                this.setState({
                    curTime : new Date().toLocaleString()
                })
            },1000)
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    componentWillUnmount() {
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h1>Historial</h1>
                    <div className="table-responsive">
                        <TableDatos data={this.tableHeader} ref={this.childInventarioP}/>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}