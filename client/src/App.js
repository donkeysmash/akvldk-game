import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';
import NameForm from './components/NameForm';

class App extends Component {
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
