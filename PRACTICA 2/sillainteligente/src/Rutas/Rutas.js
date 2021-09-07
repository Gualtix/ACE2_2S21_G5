import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../Dashboard/App';

export default function Nav(){
    return(
        <Router>
            <Route path='/' component={App} />
        </Router>
    );
}
