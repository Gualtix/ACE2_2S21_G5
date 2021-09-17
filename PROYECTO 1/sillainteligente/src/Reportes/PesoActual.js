import React from "react";
import axios from 'axios';
import Environment from '../environment';

export default class PesoActual extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            curTime: '',
            tipo: '',
            option: '',
            peso: 0
        };
        this.isSubscribedTPesoActual = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Reportes/Peso';
        this.getData = this.getData.bind(this);
    }


    async getData(){
        if(this.isSubscribedTPesoActual)
        {
            this.setState({
                curTime : new Date().toLocaleString()
            })
    
            var config = {
                method: 'GET',
                host: Environment.HOST,
                port: Environment.PORT,
                path: '/Reportes/Peso',
                url: this.url,
                headers: { },
                data : {}           
              };
              
    
            axios(config)
            .then(
                (response)=>{
                    if(response.data.length > 0){
                        this.setState({peso: Number(response.data[0].peso).toFixed(2)})
                    }
                }
            ).catch(err => {})
        }
    }

    setState = (state, callback) => {
        if (this.isSubscribedTPesoActual) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedTPesoActual = true;
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedTPesoActual = false;
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Peso Actual</h2>
                    <br />
                    <h1 className="text-center"> <span className="badge badge bg-dark">{this.state.peso}&nbsp;Kg</span></h1>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}