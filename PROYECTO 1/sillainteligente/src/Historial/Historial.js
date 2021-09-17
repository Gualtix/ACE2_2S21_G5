import React from "react";
import axios from 'axios';
import Environment from '../environment';
//import TableDatos from "./TableHistorial";
import ReactTable from "react-table"; 
import 'react-table/react-table.css'

export default class Movimiento extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            curTime: '',
            loading:true,
            data: []  
        };
        this.isSubscribedHistorial = false;
        this.url = Environment.HOST + ":" + Environment.PORT + "/Horario";
        this.tableHeader = ["Fecha", "Tiempo_Uso", "Peso", "Entrada", "Salida"];
        this.getData = this.getData.bind(this);
        this.childInventarioP = React.createRef();
    }

    async getData(){
        if(this.isSubscribedHistorial)
        {
            this.setState({
                curTime : new Date().toLocaleString()
            })
            axios.get(this.url, {})
            .then(
                (response)=>{
                    if(response.data.length > 0){
                        let datito = [];
                        response.data.map((item) =>
                        {
                            if(item.fecha2 !== "" && item.fecha2 !== undefined)
                            {
                                var date = new Date(item.fecha1).getTime();
                                var date1 = new Date(item.fecha2).getTime();
                                var tiempo = (date1 - date)/3600;
                                datito.push(
                                    {
                                        fecha: new Date(item.fecha1).toLocaleString(),
                                        entrada: new Date(item.fecha1).toLocaleTimeString(),
                                        salida: new Date(item.fecha2).toLocaleTimeString(),
                                        peso: ((item.peso1 + item.peso2)/2).toFixed(2) + " Kg",
                                        tiempo_uso: tiempo.toFixed(2) + " min"
                                    }
                                );
                            }
                        });
                        this.setState({loading: false, data: datito});
    
                        /*
                        response.data.forEach((element)=>{
                            if(element.fecha2 !== "" && element.fecha2 !== undefined)
                            {
                                var date = new Date(element.fecha1).getTime();
                                var date1 = new Date(element.fecha2).getTime();
                                var tiempo = (date1 - date)/3600;
                                let val = {
                                    Fecha: new Date(element.fecha1).toLocaleString(),
                                    Entrada: new Date(element.fecha1).toLocaleString(),
                                    Salida: new Date(element.fecha2).toLocaleString(),
                                    Peso: ((element.peso1 + element.peso2)/2).toFixed(2) + " Kg",
                                    Tiempo_Uso: tiempo.toFixed(2) + " min"
                                }
                                datito.push(val);
                            }
                        });
                        if(this.childInventarioP.current != null){
                            this.childInventarioP.current.removeRow();
                            this.childInventarioP.current.agregar_datos(datito);
                        }*/
                    }
                }
            ).catch(err => {})
        }
    }

    async componentDidMount() {
        try {
            this.isSubscribedHistorial = true;
            setInterval(this.getData, 5000);
        } catch (error) {
            console.log("Errores de render");
        }

    }
    setState = (state, callback) => {
        if (this.isSubscribedHistorial) {
          super.setState(state, callback);
        }
     }

    async componentWillUnmount() {
        this.isSubscribedHistorial = false;
        clearInterval(this.getData);
    }

    render()
    {
        //"Fecha", "Tiempo_Uso", "Peso", "Entrada", "Salida"
        const columns =  [
            {
                Header: "Fecha",
                accessor: "fecha"
            },
            {
                Header: "Tiempo de Uso",
                accessor: "tiempo_uso"
            },
            {
                Header: "Peso",
                accessor: "peso"
            }
            ,
            {
                Header: "Inicio",
                accessor: "entrada"
            }
            ,
            {
                Header: "Fin",
                accessor: "salida"
            }
          ];
          //<TableDatos data={this.tableHeader} ref={this.childInventarioP}/>
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Historial</h2>
                    <div className="table-responsive">
                        <ReactTable  
                            data={this.state.data}  
                            columns={columns}  
                        />
                    </div>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}