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
          <Link to="/logout">logout</Link>
        </div>
      );
    }
    return (
        <div className={rootCx}>
          <Link to="/login">login</Link>
        </div>
    );
  }
}

const rootCx = css({
  marginTop: '1rem',
  backgroundColor: 'pink'
});

export default Header;