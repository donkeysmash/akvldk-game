import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react'

import nameStore from '../store/name';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      nameStore.isNameAvailable() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
