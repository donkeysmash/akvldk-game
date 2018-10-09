import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './root.css';

const rootEl = document.getElementById('application');


ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), rootEl)