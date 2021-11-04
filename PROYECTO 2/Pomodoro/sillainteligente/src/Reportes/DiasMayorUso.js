import React from "react";
import axios from 'axios';
import Environment from '../environment';
import { Bar } from 'react-chartjs-2';

export default class DiasMayorUso extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {},
            options: {},
            curTime: '',
        };
        this.isSubscribedMayorUso = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Reportes/Uso/Grafica';
        this.getData = this.getData.bind(this);
    }


    async getData(){
      if(this.isSubscribedMayorUso)
      {

        this.setState({
            curTime : new Date().toLocaleString()
        })

        var config = {
            method: 'GET',
            host: Environment.HOST,
            port: Environment.PORT,
            path: '/Reportes/Uso/Grafica',
            url: this.url,
            headers: { },
            data : {}           
          };
          

        axios(config)
        .then(
            (response)=>{
                if(response.data.length > 0){
                    let label = []
                    let datos = []
                    let promedio = []
                    response.data.forEach(element => {
                        label.push(element.dia)
                        datos.push(element.contador)
                        promedio.push(element.promedio)
                    });

                    const data = {
                        labels: label,
                        datasets: [
                        {
                          type: 'bar',
                          label: 'Uso',
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
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(230, 159, 64, 0.2)',
                          ],
                          borderWidth: 2
                        }, {
                          type: 'line',
                          label: 'Promedio',
                          data: promedio,
                          fill: false,
                          borderColor: 'rgb(54, 162, 235)',
                          borderWidth: 2
                        }]
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
        if (this.isSubscribedMayorUso) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedMayorUso = true;
            setInterval(this.getData, 5000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedMayorUso = false;
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Dias de Mayor Uso</h2>
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