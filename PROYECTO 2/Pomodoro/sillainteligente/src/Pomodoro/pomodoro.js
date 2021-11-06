import React from 'react';
import {Card, Button} from 'react-bootstrap'

export default class Pomodoro extends React.Component{
    constructor(props)
    {
        super(props);

        this.minutes= "00";
        this.seconds= "00";
        this.hours = "00";
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
                            <Button  variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Pomodoro</Button>&nbsp;
                            <Button  variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Short Break</Button>&nbsp;
                            <Button  variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#ef5350', backgroundColor: '#ef5350', color: 'white'}} >Long Break</Button>&nbsp;
                            <br/>
                            <br/>
                            <br/>
                            <br/>  
                            <br/>
                            <Card.Title style = {{fontSize: '100px', fontWeight: 'bold'}}>
                                {this.hours}:{this.minutes}:{this.seconds}   
                            </Card.Title>                      
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button variant="light" style={{ width: '15rem', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', borderColor: '#e8504e', backgroundColor: '#e8504e', color: 'white'}} >START</Button>
                        </Card.Footer>
                    </Card>
                </center>
            </div>
        );
    }

}
