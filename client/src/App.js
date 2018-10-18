import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import SessionList from './components/SessionList';
import SessionView from './components/SessionView';
import Header from './components/Header';
import { inject, observer } from 'mobx-react';


@inject('commonStore', 'userStore')
@withRouter
@observer
class App extends Component {
  constructor(props) {
    super(props);
    const { userStore, commonStore } = props;
    if (!userStore.displayName) {
      commonStore.setAppLoaded();
    }
  }

  async componentDidMount() {
    const { userStore, commonStore } = this.props;
    if (userStore.displayName) {
      await userStore.loginWithDisplayName(userStore.displayName);
      commonStore.setAppLoaded();
    }
  }

  render() {
    const { commonStore } = this.props;
    if (commonStore.appLoaded) {
      return (
        <div className={rootCx}>
          <div className={containerCx}>
            <Header />
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login}/>
              <PrivateRoute path="/sessions/:sessionId" component={SessionView} />
              <Route exact path="/sessions" component={SessionList}/>
              <Route exact path="/" component={SessionList}/>
            </Switch>
          </div>
        </div>
      );
    }
    return null;
  }
}

const rootCx = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const containerCx = css({
  width: '90vw',
});

export default hot(module)(App);
