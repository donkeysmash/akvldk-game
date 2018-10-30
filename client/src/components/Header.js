import React, { Component } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'gameStore')
@observer
class Header extends Component {
  onClickLeave = () => {
    this.props.gameStore.leave();
  }

  render() {
    const { userStore, gameStore } = this.props;
    if (userStore.currentUser) {
      return (
        <div className={rootCx}>
          {gameStore.isStarted &&
            <Link onClick={this.onClickLeave} className={linkCx} to="/">Leave game</Link>
          }
          <span>{userStore.displayName}</span>
          <Link className={linkCx} to="/logout">Logout</Link>
        </div>
      );
    }
    return (
        <div className={rootCx}>
          <Link className={linkCx} to="/login">login</Link>
        </div>
    );
  }
}

const rootCx = css({
  marginTop: '1rem',
  backgroundColor: 'pink',
  textAlign: 'right',
  padding: '0.2rem 0'
});

const linkCx = css({
  marginRight: '1rem',
  marginLeft: '1rem'
});

export default Header;