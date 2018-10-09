import React, { Component } from 'react';
import { css } from 'emotion';
import { Redirect } from 'react-router-dom';
import nameStore from '../store/name';

class Login extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
  }

  state = {
    isSubmitting: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const inputValue = this.nameRef.current.value;
    nameStore.setName(inputValue);
  }

  render() {
    const { isSubmitting } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (nameStore.isNameAvailable()) {
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
          <button className={buttonCx} disabled={isSubmitting}>Go</button>
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