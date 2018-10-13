import React, { Component } from 'react';
import { css } from 'emotion';
import { Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@withRouter
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
  }

  handleSubmit = async e => {
    e.preventDefault();
    const inputValue = this.nameRef.current.value;
    await this.props.userStore.loginWithDisplayName(inputValue)
  }

  render() {
    const { userStore } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (userStore.currentUser) {
      return <Redirect to={from} />;
    }
    return (
      <div className={rootCx}>
        <div className={welcomeCx}>
          Mafia game helper
        </div>
        <form className={formCx} onSubmit={this.handleSubmit}>
          <input
            ref={this.nameRef}
            className={inputCx}
            type="text"
            placeholder="Name"
          />
          <button className={buttonCx} disabled={userStore.loadingUser}>Go</button>
        </form>
      </div>
    );
  }
}

const rootCx = css({
  display: 'block',
  marginTop: '5rem'
});
const welcomeCx = css({
  fontSize: '2rem'
});
const inputCx = css({
  width: '90%',
  display: 'block'
});
const buttonCx = css({
  marginTop: '0.2rem',
  display: 'block'
});
const formCx = css({
  marginTop: '0.5rem'
});

export default Login;