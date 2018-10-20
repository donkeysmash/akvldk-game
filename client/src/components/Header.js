import React, { Component } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
class Header extends Component {
  render() {
    const { userStore } = this.props;
    if (userStore.currentUser) {
      return (
        <div className={rootCx}>
          <span>{userStore.displayName}</span>
          <Link className={linkCx} to="/logout">logout</Link>
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