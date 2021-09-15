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
        this.url = Environment.HOST + ":" + Environment.PORT + "/Horario";
        this.tableHeader = ["Fecha", "Tiempo_Uso", "Peso", "Entrada", "Salida"];
        this.getData = this.getData.bind(this);
        this.childInventarioP = React.createRef();
    }

    async getData(){
        let config = {
            method: 'get',
            host: Environment.HOST,
            port: Environment.PORT,
            path: '/insertData',
            url: this.url,
            headers: {
              'Content-Type': 'application/json'
            },
            data : {}
        };
        axios.get(config)
        .then(
            (response)=>{
                if(response.data.length > 0){
                    var datito = [];
                    response.data.forEach((element)=>{
                        var date = new Date(element.fecha1).getTime();
                        var date1 = new Date(element.fecha2).getTime();
                        var tiempo = (date1 - date)/3600;
                        let val = {
                            Fecha: element.fecha1,
                            Entrada: element.fecha1,
                            Salida: element.fecha2,
                            Peso: (element.peso1 + element.peso2)/2,
                            Tiempo_Uso: tiempo
                        }
                        datito.push(val);
                    })

                    this.setState({data: datito});
                    if(this.childInventarioP.current != null){
                        this.childInventarioP.current.removeRow();
                        this.childInventarioP.current.agregar_datos(datito);
                    }
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