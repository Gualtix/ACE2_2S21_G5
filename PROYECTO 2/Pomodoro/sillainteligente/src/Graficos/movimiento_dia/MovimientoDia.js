import React from "react";
import axios from 'axios';
import Environment from '../../environment';

export default class MovimientoDia extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            curTime: '',
            inicio: '',
            final: '',
            tiempo: ''
        };
        this.isSubscribedMovimientoDia = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Dashboard/TiempoUso';
        this.getData = this.getData.bind(this);
    }

    async getData(){
        if(this.isSubscribedMovimientoDia)
        {
            this.setState({
                curTime : new Date().toLocaleString()
            })
    
            var config = {
                method: 'GET',
                host: Environment.HOST,
                port: Environment.PORT,
                path: '/Dashboard/TiempoUso',
                url: this.url,
                headers: { },
                data : {}           
              };
              
    
            axios(config)
            .then(
                (response)=>{
                    if(response.data.length > 0){
                        this.setState({tiempo: Number(response.data[0].tiempo).toFixed(2)})
                        this.setState({inicio: new Date(response.data[0].inicio).toLocaleString()})
                        this.setState({final: new Date(response.data[0].final).toLocaleString()})
                    }
                    else{
                        this.setState({tiempo: 0.00})
                        this.setState({inicio: ''})
                        this.setState({final: ''})
                    }
                }
            ).catch(err => {})
        }
    }

    setState = (state, callback) => {
        if (this.isSubscribedMovimientoDia) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedMovimientoDia = true;
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedMovimientoDia = false;
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h1 className="text-right">Tiempo: &nbsp;<span className="badge badge bg-dark">{this.state.tiempo}&nbsp;Hrs</span></h1>
                    <h1 className="text-right">Inicio: &nbsp;<span className="badge badge bg-dark">{this.state.inicio}&nbsp;</span></h1>
                    <h1 className="text-right">Fin: &nbsp; <span className="badge badge bg-dark">{this.state.final}&nbsp;</span></h1>
                </div>
            </div>
        )
    }
}