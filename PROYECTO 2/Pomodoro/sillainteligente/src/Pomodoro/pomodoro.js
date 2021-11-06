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
        this.getData = this.getData.bind(this);
        this.startoTime = this.startoTime.bind(this);
        this.Pomodoro = this.Pomodoro.bind(this);
        this.Short = this.Short.bind(this);
        this.Large = this.Large.bind(this);
        this.Reiniciar = this.Reiniciar.bind(this);
        this.Iniciar = this.Iniciar.bind(this);
        this.postConfiguracion = this.postConfiguracion.bind(this);
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
            }catch(error){}
        }  
    }

    async postConfiguracion(tipo){
        switch(tipo){
            case 1:
                
                break;
            case 2:
                break;
            case 3:
                break;
            default:
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
    }

    Short()
    {
        this.minutes = this.short;
        this.setState({ minutos: this.short})
        this.setState({ segundos: 0})
    }

    Large()
    {
        this.minutes = this.large;
        this.setState({ minutos: this.large})
        this.setState({ segundos: 0})
    }

    Reiniciar()
    {
        this.minutes = 0;
        this.seconds = 0;
        this.setState({ minutos: 0})
        this.setState({ segundos: 0})
        this.isSubscribedTimeStarto = false;
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
                <center>
                    <Card bg = "danger" style={{ width: '70rem', height: '30rem'}}>
                        <Card.Body>
                            <Button  onClick={this.Pomodoro} variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Pomodoro</Button>&nbsp;
                            <Button  onClick={this.Short} variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Short Break</Button>&nbsp;
                            <Button  onClick={this.Large} variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Long Break</Button>&nbsp;
                            <Button  onClick={this.Reiniciar} variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Reiniciar</Button>&nbsp;
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
