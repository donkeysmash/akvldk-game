import React, { Component } from 'react';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'sessionStore')
@observer
class CreateSession extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.gameTypeRef = React.createRef();
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { userStore, sessionStore } = this.props;
    const hostId = userStore.currentUser._id;
    const inputValue = this.nameRef.current.value;
    const gameType = this.gameTypeRef.current.value;
    await sessionStore.createSession(inputValue, hostId, gameType);
    this.nameRef.current.value = '';
  }

  render() {
    const { userStore, sessionStore } = this.props;
    if (!userStore.currentUser) {
      return null;
    }
    return (
      <div className={rootCx}>
        <div className={welcomeCx}>
          Create new session
        </div>
        <form className={formCx} onSubmit={this.handleSubmit}>
          <input
            ref={this.nameRef}
            className={inputCx}
            type="text"
            placeholder="Name"
          />
          <select ref={this.gameTypeRef}>
            <option value="MAFIA">Mafia</option>
            <option value="RSP">RSP</option>
          </select>
          <button className={buttonCx} disabled={sessionStore.isCreating}>Go</button>
        </form>
      </div>
    );
  }
}

const rootCx = css({
  display: 'block',
});
const welcomeCx = css({
  fontSize: '2rem'
});
const inputCx = css({
  display: 'block'
});
const buttonCx = css({
  marginTop: '0.2rem',
  display: 'block'
});
const formCx = css({
  marginTop: '0.5rem'
});

export default CreateSession;