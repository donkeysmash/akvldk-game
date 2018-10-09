import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import SessionList from './components/SessionList';
import SessionView from './components/SessionView';
import nameStore from './store/name';


class App extends Component {
  componentWillMount() {
    nameStore.load();
  }

  render() {
    return (
      <div className={rootCx}>
        <div className={containerCx}>
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/sessions/:sessionId" component={SessionView} />
          <Route exact path="/sessions" component={SessionList}/>
          <Route exact path="/" component={SessionList}/>
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
