import React from "react";
import axios from 'axios';
import Environment from '../../environment';

export default class Movimiento extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            curTime: ''  
        };
        this.isSubscribedMovimiento = false;
        this.url = Environment.HOST + ":" + Environment.PORT;
        this.getData = this.getData.bind(this);
    }

    
    async getData(){
        if(this.isSubscribedMovimiento)
        {
            this.setState({
                curTime : new Date().toLocaleString()
            })
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
    }

    setState = (state, callback) => {
        if (this.isSubscribedMovimiento) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedMovimiento = true;
            setInterval(this.getData, 30000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedMovimiento = false;
        clearInterval(this.getData);
    }

    render()
    {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h2>Movimiento y Uso</h2>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )
    }
}