import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../Dashboard/App';
import Bd from '../BD/Bd';
import Menu from '../Menu/Menu';
import Profile from '../Profile/Profile'
import Reportes from '../Reportes/Reportes';
import Pomodoro from '../Pomodoro/pomodoro';

export default function Nav(){
    return(
        <Router>
            <div id="main-wrapper">
                <Menu />
                <div className="page-wrapper">
                    <Route exact  path='/' component={Pomodoro} />
                    <Route exact  path='/Informacion' component={Bd} />
                    <Route exact  path='/Perfil' component={Profile} />                  
                    <footer className="footer">
                        © 2021 SMART CHAIR
                    </footer>
                </div>
            </div>
        </Router>
    );
}
