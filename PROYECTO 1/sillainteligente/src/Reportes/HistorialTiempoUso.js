import React from "react";
import axios from 'axios';
import Environment from '../environment';
//import TableDatosArduino from "./TableArduino";
import ReactTable from "react-table"; 
import 'react-table/react-table.css'


export default class HistorialTiempoUso extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            curTime: '',
            loading:true,
            data: []  
        };
        this.isSubscribedHistorialTiempoUso = false;
        this.url = Environment.HOST + ":" + Environment.PORT + "/Reportes/Uso/Historial";
        this.tableHeader = ["Fecha", "En_Silla", "Peso"];
        this.getData = this.getData.bind(this);
        this.childInventarioP = React.createRef();
        
    }
    
    

    async getData(){
        if(this.isSubscribedHistorialTiempoUso)
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
                            datito.push(
                                {
                                    fecha: new Date(item.fecha).toLocaleString(),
                                    tiempo: Number(item.tiempo).toFixed(2),
                                    entrada: item.entrada,
                                    salida: item.salida
                                }
                            );
                        });
                        this.setState({loading: false, data: datito});
                        /*
                        response.data.forEach((element)=>{
                            let val = {
                                Fecha: new Date(element.fecha).toLocaleString(),
                                En_Silla: String(element.en_silla),
                                Peso: element.peso.toFixed(2) + " Kg"
                            }
                            datito.push(val);
                        });
    
                        if(this.childInventarioP.current != null){
                            this.childInventarioP.current.removeRow();
                            this.childInventarioP.current.agregar_datos(datito);
                        }
                        */
                    }
                }
            ).catch(err => {})
        }

    }

    

    setState = (state, callback) => {
        if (this.isSubscribedHistorialTiempoUso) {
          super.setState(state, callback);
        }
     }

     async componentDidMount() {
        try {
            this.isSubscribedHistorialTiempoUso = true;
            setInterval(this.getData, 5000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedHistorialTiempoUso = false;
        clearInterval(this.getData);
    }

    render()
    {
        const columns =  [
            {
                Header: "Fecha",
                accessor: "fecha"
            },
            {
                Header: "Tiempo",
                accessor: "tiempo"
            },
            {
                Header: "Entrada",
                accessor: "entrada"
            },
            {
                Header: "Salida",
                accessor: "salida"
            }                      
          ];
          //<TableDatosArduino data={this.tableHeader} ref={this.childInventarioP}/>

        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Historial de Tiempo de Uso</h2>
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