import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('commonStore', 'userStore', 'gameStore')
@observer
class Logout extends Component {
  constructor(props) {
    super(props);
    const { userStore, gameStore } = props;
    gameStore.leave();
    userStore.forgetUser();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default Logout;