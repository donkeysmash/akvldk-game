import React, { Component } from 'react';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';
import Select from 'react-select';

@inject('userStore', 'sessionStore')
@observer
class CreateSessionItem extends Component {
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
    const gameType = this.gameTypeRef.current.state.value.value;

    await sessionStore.createSession(inputValue, hostId, gameType);
    this.nameRef.current.value = '';
  }

  render() {
    const { sessionStore, userStore } = this.props;
    if (!userStore.currentUser) {
      return null;
    }
    const gameOptions = [
      // { value: 'MAFIA', label: 'Mafia' },
      { value: 'RSP', label: 'RSP' },
      { value: 'PLANNING_POKER', label: 'Planning Poker' }
    ];
    const selectStyles = {
      container: (base, state) => ({ ...base, width: '10rem' })
    };

    return (
      <div className={rootCx}>
        <form className={formCx} onSubmit={this.handleSubmit}>
          <input
            ref={this.nameRef}
            className={inputCx}
            type="text"
            placeholder="Game title"
          />
          <Select ref={this.gameTypeRef} options={gameOptions} styles={selectStyles} />
          <button className={buttonCx} disabled={sessionStore.isCreating}>🚀</button>
        </form>
      </div>
    );
  }
}
const inputCx = css({
  marginLeft: '0.3rem',
  border: '0',
  padding: '0',
  fontSize: '1rem'
});
const buttonCx = css({
  fontSize: '1.4rem'
});
const formCx = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const rootCx = css({
  marginBottom: '0.3rem',
  padding: '0.2rem',
  border: 'brown solid 1px',
  borderRadius: '1rem'
});

export default CreateSessionItem;