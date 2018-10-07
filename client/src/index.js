import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './root.css';

const rootEl = document.getElementById('application');
const render = Component => ReactDOM.render(<Component />, rootEl);

render(App);
