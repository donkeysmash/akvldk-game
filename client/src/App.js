import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';
import NameForm from './components/NameForm';
import axios from 'axios';
import config from '../config';


class App extends Component {
  async componentWillMount() {
    debugger;
    // axios.get()
  }



  render() {
    return (
      <div className={className}>
        <NameForm />
      </div>
    );
  }
}

const className = css({
  display: 'flex',
  justifyContent: 'center'
});

export default hot(module)(App);
