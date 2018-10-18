import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('userStore', 'commonStore')
@withRouter
@observer
class PrivateRoute extends Component {
  render() {
    const { userStore, location, ...restProps } = this.props;
    if (userStore.currentUser) return <Route {...restProps} />
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )
  }
}

export default PrivateRoute;
