import React from "react";
import axios from 'axios';
import Environment from '../../environment';
import { Bar } from 'react-chartjs-2';

export default class TiempoUsoGrafica extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {},
            curTime: '',
            tipo: '',
            options: {},
            colores: []
        };
        this.isSubscribedTiempoGrafica = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Dashboard/Horas/Promedio';
        this.getDataUsoGrafica = this.getDataUsoGrafica.bind(this);
        this.update = this.update.bind(this);
    }

    update = (tipo) => {
        this.setState({tipo: tipo});
    }

    async getDataUsoGrafica(){
        if (this.isSubscribedTiempoGrafica) {
            this.setState({
                curTime : new Date().toLocaleString()
            })

            var data = {tipo: this.state.tipo}
            var config = {
                method: 'POST',
                host: Environment.HOST,
                port: Environment.PORT,
                path: '/Dashboard/Horas/Promedio',
                url: this.url,
                headers: { },
                data : data           
            };
            
            axios(config)
            .then(
                (response)=>{
                    if(response.data.length > 0){
                        
                        let datos = []
                        let label = []
                        response.data.forEach(element => {
                            datos.push(element.horas)
                            switch(this.state.tipo)
                            {
                                case "mes":
                                    label.push(element.mes)
                                    break;
                                case "semana":
                                    label.push(element.semana)
                                    break;
                                default:
                                    label.push(element.dia)
                                    break;
                            }
                        });
                        
                        const data = {
                        labels: label,
                        datasets: [
                            {
                            label: 'Tiempo de Uso de Silla',
                            data: datos,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(230, 159, 64, 0.2)',
                                ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(230, 159, 64, 0.2)',
                                ],
                            borderWidth: 1,
                            },
                        ],
                        };

                        this.setState({data: data});
                        
                        const options = {
                        scales: {
                            yAxes: [
                            {
                                ticks: {
                                beginAtZero: true,
                                },
                            },
                            ],
                        },
                        };
                        this.setState({options: options});
                    }
                }
            ).catch(err => {})
        }
    }

    setState = (state, callback) => {
        if (this.isSubscribedTiempoGrafica) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedTiempoGrafica = true;
            setInterval(this.getDataUsoGrafica, 5000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedTiempoGrafica = false;
        clearInterval(this.getDataUsoGrafica);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Tiempo de Uso de Silla</h2>
                    <br />
                    <Bar data={this.state.data} options={this.state.options} />
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}