import React from "react";
import axios from 'axios';
import Environment from '../../environment';
import { Line } from "react-chartjs-2";

export default class Peso extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: {},
            curTime: '',
            tipo: '',
            options: {}
        };
        this.isSubscribedPeso = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Dashboard/Peso';
        this.getData = this.getData.bind(this);
        this.update = this.update.bind(this);
        this.calculo = this.calculo.bind(this);
    }

    calculo = (x0,y0,x1,y1,data)=>
    {
        let m = (y1-y0)/(x1-x0);
        let dat = [];
        var a = 1;
        data.forEach((element)=>
        {
            dat.push(m*a)
            a++;
        })
        return dat;
    }

    async getData(){
        if(this.isSubscribedPeso)
        {
            this.setState({
                curTime : new Date().toLocaleString()
            })
            var data = {tipo: this.state.tipo}
            var config = {
                method: 'POST',
                host: Environment.HOST,
                port: Environment.PORT,
                path: '/Dashboard/Peso',
                url: this.url,
                headers: { },
                data : data           
              };
              
    
            axios(config)
            .then(
                (response)=>{
                    if(response.data.length > 0){
                        let datito = [];
                        let label = [];
                        switch(this.state.tipo)
                        {
                            case "mes":
                                response.data.forEach(element => {
                                    label.push(element.mes)
                                    datito.push(element.peso)
                                });
                                break;
                            case "semana":
                                response.data.forEach(element => {
                                    label.push(element.semana)
                                    datito.push(element.peso)
                                });
                                break;
                            default:
                                response.data.forEach(element => {
                                    label.push(element.dia)
                                    datito.push(element.peso)
                                });
                                break;
                        }
                        let tendencia = this.calculo(1,datito[0], datito.length, datito[datito.length-1],datito);
                        const data = {
                            labels: label,
                            datasets: [
                              {
                                label: "Peso",
                                data: datito,
                                fill: true,
                                backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)"
                              },
                              {
                                label: "Tendencia",
                                data: tendencia,
                                fill: false,
                                borderColor: "#742774"
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
        if (this.isSubscribedPeso) {
          super.setState(state, callback);
        }
     }

    update = (tipo) => {
        
        this.setState({tipo: tipo});
    }

    async componentDidMount() {
        try {
            this.isSubscribedPeso = true;
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedPeso = false;
        clearInterval(this.getData);
    }

    render()
    {

        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Peso</h2>
                    <Line data={this.state.data} />
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}