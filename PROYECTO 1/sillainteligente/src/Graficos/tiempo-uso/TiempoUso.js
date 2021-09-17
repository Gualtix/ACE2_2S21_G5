import React from "react";
import axios from 'axios';
import Environment from '../../environment';

export default class TiempoUso extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            curTime: '',
            tipo: '',
            option: '',
            horas: ''
        };
        this.isSubscribedTiempo = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/Dashboard/Horas/Total';
        this.getData = this.getData.bind(this);
        this.update = this.update.bind(this);
    }

    update = (tipo, option) => {
        
        this.setState({tipo: tipo, option: option});
    }

    async getData(){
        this.setState({
            curTime : new Date().toLocaleString()
        })

        var data = {tipo: this.state.tipo, option: this.state.option}
        var config = {
            method: 'GET',
            host: Environment.HOST,
            port: Environment.PORT,
            path: '/Dashboard/Horas/Total',
            url: this.url,
            headers: { },
            data : JSON.stringify(data)            
          };
          

        axios.get(this.url, config)
        .then(
            (response)=>{
                if(response.data.length > 0){
                    console.log(response.data[0]);
                    this.setState({horas: (response.data[0].horas).toFixed(2)})
                }
            }
        ).catch(err => {})
    }

    setState = (state, callback) => {
        if (this.isSubscribedTiempo) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedTiempo = true;
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedTiempo = false;
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Tiempo Total de Horas de Uso</h2>
                    <br />
                    <h3><strong>Horas: &nbsp;</strong><span className="badge badge-light">{this.state.horas}</span></h3>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}