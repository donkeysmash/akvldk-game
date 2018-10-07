import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';

const className = css({
  display: 'flex'

});

class App extends Component {
  render() {
    return (
      <div className={className}>
        Hello World
      </div>
    );
  }
}

export default hot(module)(App);
