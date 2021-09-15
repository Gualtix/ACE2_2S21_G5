import React, {Component} from "react";
import axios from 'axios';
import Environment from '../../environment';

export default class TiempoUso extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            curTime: ''  
        };
        this.url = Environment.HOST + ":" + Environment.PORT;
        this.getData = this.getData.bind(this);
    }

    async getData(){
        axios.get(this.url,{})
        .then(
            (response)=>{
                if(response.data.length > 0){
                    var datito = [];
                    response.data.forEach((element)=>{
                    })

                    this.setState({data: datito});
                }
            }
        ).catch(err => {})
    }

    async componentDidMount() {
        try {
            setInterval( () => {
                this.setState({
                    curTime : new Date().toLocaleString()
                })
            },1000)
            setInterval(this.getData, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    componentWillUnmount() {
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h1>Tiempo de Uso</h1>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}