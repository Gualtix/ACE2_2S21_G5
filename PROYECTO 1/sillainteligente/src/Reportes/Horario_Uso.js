import React from "react";
import axios from 'axios';
import Environment from '../environment';
import { Line } from "react-chartjs-2";

export default class HorarioUsito extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {},
            curTime: '',
            tipo: '',
            options: {}
        };
        this.isSubscribedHorarioUsos = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Reportes/Horario/Horario';
        this.getData = this.getData.bind(this);
    }



    async getData(){
        if(this.isSubscribedHorarioUsos)
        {
            this.setState({
                curTime : new Date().toLocaleString()
            })
            
            var config = {
                method: 'GET',
                host: Environment.HOST,
                port: Environment.PORT,
                path: '/Reportes/Horario/Horario',
                url: this.url,
                headers: { },
                data : {}           
              };
              
    
            axios(config)
            .then(
                (response)=>{
                    if(response.data.length > 0){
                        let datito = [];
                        let label = [];
                        response.data.forEach(element => {
                            label.push(element.hora)
                            datito.push(element.contador)
                        });
                        const data = {
                            labels: label,
                            datasets: [
                              {
                                label: "Tiempo",
                                data: datito,
                                fill: true,
                                backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)"
                              }
                            ]
                          };
                        this.setState({data: data})
                    }
                }
            ).catch(err => {})
        }

    }

    setState = (state, callback) => {
        if (this.isSubscribedHorarioUsos) {
          super.setState(state, callback);
        }
     }


    async componentDidMount() {
        try {
            this.isSubscribedHorarioUsos = true;
            setInterval(this.getData, 5000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedHorarioUsos = false;
        clearInterval(this.getData);
    }

    render()
    {

        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Horario de Uso</h2>
                    <Line data={this.state.data} />
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}