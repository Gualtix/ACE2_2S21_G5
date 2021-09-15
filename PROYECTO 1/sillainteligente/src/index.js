import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rutas from './Rutas/Rutas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/cards.css';
import './assets/css/animate.css';
import './assets/css/spinners.css';

ReactDOM.render(
  <React.StrictMode>
    <Rutas />
  </React.StrictMode>,
  document.getElementById('root')
);

