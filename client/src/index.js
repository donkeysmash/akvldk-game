import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react';
import App from './App';
import './root.css';

import stores from './stores';

import DevTools from 'mobx-react-devtools';

const rootEl = document.getElementById('application');

ReactDOM.render((
  <Provider {...stores}>
    <div>
    <DevTools />
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </div>
  </Provider>
), rootEl)