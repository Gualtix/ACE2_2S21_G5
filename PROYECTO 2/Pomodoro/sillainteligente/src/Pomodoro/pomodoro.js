import React from 'react';
import {Card, Button} from 'react-bootstrap'
import axios from 'axios';
import Environment from '../environment';

export default class Pomodoro extends React.Component{
    constructor(props)
    {
        super(props);

        this.minutes= 0;
        this.seconds= 0;
        this.pomodoro = 0;
        this.short = 0;
        this.large = 0;

        this.state = {
            data: {},
            options: {},
            minutos: 0,
            segundos: 0
        };
        this.isSubscribedTime = false;
        this.isSubscribedTimeStarto = false;
        this.url = Environment.HOST + ":" + Environment.PORT + '/obtenerTiempo';
        this.urlStatus = Environment.HOST + ":" + Environment.PORT + '/getStatus';
        this.urlConf = Environment.HOST + ":" + Environment.PORT + '/configuracion';
        this.urlConfdel = Environment.HOST + ":" + Environment.PORT + '/reiniciar/configuracion';
        this.getData = this.getData.bind(this);
        this.startoTime = this.startoTime.bind(this);
        this.Pomodoro = this.Pomodoro.bind(this);
        this.Short = this.Short.bind(this);
        this.Large = this.Large.bind(this);
        this.Reiniciar = this.Reiniciar.bind(this);
        this.Iniciar = this.Iniciar.bind(this);
        this.postConfiguracion = this.postConfiguracion.bind(this);
        this.isSentado = false;
    }

    async startoTime(){
        if(this.isSubscribedTimeStarto)
        {
            if(this.seconds == 0)
            {
                if(this.minutes > 0)
                {
                    this.seconds = 59;
                    this.minutes = this.minutes-1;
                }
            }
            else{
                this.seconds = this.seconds - 1;
            }
        }
    }
    async getData(){
        if(this.isSubscribedTime)
        {
            try{
                axios.get(this.url,{})
                .then((response)=>{
                    this.setState({ data: response.data})
                    this.pomodoro = response.data.Pomodoro;
                    this.short = response.data.Short_Break;
                    this.large = response.data.Large_Break;
                }).catch((error)=>{console.log(error)})

                axios.get(this.urlStatus, {})
                .then((response)=>{
                    this.isSentado = (response.data[0].en_silla)
                }).catch((error)=>{console.log(error)})

            }catch(error){}
        }  
    }

    postConfiguracion(tipo){

        switch(tipo){
            case 1:
                let data = {
                    "Tipo": "Pomodoro",
                    "Tiempo": this.minutes 
                }
                let config = {
                    method: 'post',
                    url: this.urlConf,
                    headers: { },
                    data : data
                  };
                axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                console.log(error);
                });
                break;
            case 2:
                let data1 = {
                    "Tipo": "Short",
                    "Tiempo": this.minutes 
                }
                let config1 = {
                    method: 'post',
                    url: this.urlConf,
                    headers: { },
                    data : data1
                  };
                axios(config1)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                console.log(error);
                });
                break;
            case 3:
                let data2 = {
                    "Tipo": "Short",
                    "Tiempo": this.minutes 
                }
                let config2 = {
                    method: 'post',
                    url: this.urlConf,
                    headers: { },
                    data : data2
                  };
                axios(config2)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                console.log(error);
                });
                break;
            default:
                
                axios.get(this.urlConfdel,{})
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                console.log(error);
                });
                break;
        }
    }

    setState = (state, callback) => {
        if (this.isSubscribedTime) {
          super.setState(state, callback);
        }
     }

    async componentDidMount() {
        try {
            this.isSubscribedTime = true;
            setInterval(this.getData, 1000);
            setInterval(this.startoTime, 1000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    async componentWillUnmount() {
        this.isSubscribedTime = false;
        clearInterval(this.getData);
    }

    Pomodoro()
    {
        this.minutes = this.pomodoro;
        this.setState({ minutos: this.pomodoro})
        this.setState({ segundos: 0})
        this.postConfiguracion(1);
    }

    Short()
    {
        this.minutes = this.short;
        this.setState({ minutos: this.short})
        this.setState({ segundos: 0});
        this.postConfiguracion(2);
    }

    Large()
    {
        this.minutes = this.large;
        this.setState({ minutos: this.large})
        this.setState({ segundos: 0})
        this.postConfiguracion(3);
    }

    Reiniciar()
    {
        this.minutes = 0;
        this.seconds = 0;
        this.setState({ minutos: 0})
        this.setState({ segundos: 0})
        this.isSubscribedTimeStarto = false;
        this.postConfiguracion(4);
    }

    Iniciar()
    {
        this.isSubscribedTimeStarto = true;
    }

    render()
    {
        return(
            <div>
                <br/>
                <br/>
                
                <br/>
                <center>
                    <Card bg = "danger" style={{ width: '70rem', height: '30rem'}}>
                        <Card.Body>
                            <Button  onClick={this.Pomodoro} variant="light" style={{ width: '15rem', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Pomodoro</Button>&nbsp;
                            <Button  onClick={this.Short} variant="light" style={{ width: '15rem', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Short Break</Button>&nbsp;
                            <Button  onClick={this.Large} variant="light" style={{ width: '15rem', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Long Break</Button>&nbsp;
                            <Button  onClick={this.Reiniciar} variant="light" style={{ width: '15rem', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Reiniciar</Button>&nbsp;
                            { this.isSentado ? <span style={{ fontSize: '18px'}} className="badge badge-success text-dark"><strong>SENTADO</strong></span> : <span style={{ fontSize: '18px'}} className="badge badge-warning text-dark"><strong>PARADO</strong></span> }
                            <br/>
                            <br/>
                            <br/>
                            <br/>  
                            <br/>
                            <Card.Title style = {{fontSize: '100px', fontWeight: 'bold'}}>
                                {this.minutes}:{this.seconds}   
                            </Card.Title>                      
                        </Card.Body>
                        <Card.Footer className="text-right">
                            { !this.isSubscribedTimeStarto ? <Button onClick={this.Iniciar} variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#e8504e', backgroundColor: '#e8504e', color: 'white'}} >START</Button>: null}
                        </Card.Footer>
                    </Card>
                </center>
            </div>
        );
    }

}
