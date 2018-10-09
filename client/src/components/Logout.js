import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import nameStore from '../store/name';

class Logout extends Component {
  componentWillMount() {
    nameStore.logout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default Logout;