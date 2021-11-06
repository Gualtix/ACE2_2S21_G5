import React from "react";
import axios from 'axios';
import Environment from '../environment';

export default class TiempoSilla extends React.Component{
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
        this.url = Environment.HOST + ":" + Environment.PORT + '/tiempos';
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
                path: '/tiempos',
                url: this.url,
                headers: { },
                data : {}           
              };
              
    
            axios(config)
            .then(
                (response)=>{
                    if(response.data.Sentado !== null){
                        this.setState({peso: (Number(response.data.Sentado)/60).toFixed(2)})
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-12 col-md-12 col-sm-12">
                        <div className="card border-dark">
                            <div className="card-body">
                                <h2>Tiempo Uso Silla</h2>
                                <br />
                                <h1 className="text-center"> <span className="badge badge bg-dark">{this.state.peso}&nbsp;Min</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
    /*
                    <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
                */