import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router';
import NameForm from './components/NameForm';
import SessionList from './components/SessionList';


class App extends Component {

  render() {
    return (
      <div className={rootCx}>
        <div className={containerCx}>
          <Route path="/" component={SessionList}/>
          <Route path="/" component={NameForm}/>
        </div>
      </div>
    );
  }
}

const rootCx = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const containerCx = css({
  maxWidth: '30rem'
});

export default hot(module)(App);
