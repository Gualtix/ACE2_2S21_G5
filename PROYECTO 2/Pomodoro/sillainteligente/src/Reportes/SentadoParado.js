import React from "react";
import axios from 'axios';
import Environment from '../environment';
import { Bar } from 'react-chartjs-2';

export default class SentadoParado extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {},
            options: {},
            curTime: '',
            datos: [0,0]
        };
        this.isSubscribedMayorUso = false;
        this.label = ["Tiempo Sentado", "Tiempo Parado"]
        this.url = Environment.HOST + ":" + Environment.PORT + '/tiempos';
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
            path: '/tiempos',
            url: this.url,
            headers: { },
            data : {}           
          };
          

        axios(config)
        .then(
            (response)=>{
                if(response.data.Sentado != null && response.data.Parado != null){
                   
                    let datos = [ (Number(response.data.Sentado)/60).toFixed(2), (Number(response.data.Parado)/60).toFixed(2)]
                    this.setState({datos: datos});
                }
                else{
                  let datos = [0,0]
                    this.setState({datos: datos});
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
            setInterval(this.getData, 10000);
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
        const data = {
          labels: this.label,
          datasets: [
          {
            type: 'bar',
            label: 'Uso',
            data: this.state.datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 2
          }]
        };
        /*
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
        };*/
        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col col-lg-12 col-md-12 col-sm-12">
                    <div className="card border-dark">
                        <div className="card-body">
                            <h2>Tiempo Sentado vrs Parado  (Minutos)</h2>
                            <br />
                            <Bar data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}