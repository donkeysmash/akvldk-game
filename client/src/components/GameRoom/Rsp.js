import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { css } from 'emotion';
import { toJS } from 'mobx';

const SUBMIT = 'SUBMIT';
const JUDGE = 'JUDGE';

@inject('gameStore', 'userStore')
@observer
class Rsp extends Component {
  onReset = () => {
    const { setGameState, gameState, emitGameState } = this.props.gameStore;
    setGameState({});
    emitGameState();
  };

  onClickHandler = e => {
    const { setGameState, gameState, emitGameState } = this.props.gameStore;
    setGameState({ ...gameState, weapon: e });
    emitGameState();
  };

  render() {
    const { gameState } = this.props.gameStore;
    if (gameState.stage === SUBMIT) {
      const rockCx = genWeaponCx(gameState, 'rock');
      const paperCx = genWeaponCx(gameState, 'paper');
      const scissorsCx = genWeaponCx(gameState, 'scissors');
      return (
        <div className={rootCx}>
          <div className={rockCx} onClick={this.onClickHandler.bind(this, 'rock')}>✊</div>
          <div className={paperCx} onClick={this.onClickHandler.bind(this, 'paper')}>✋</div>
          <div className={scissorsCx} onClick={this.onClickHandler.bind(this, 'scissors')}>✌️</div>
        </div>
      )
    } else if (gameState.stage === JUDGE) {
      const { result } = gameState;
      const listResult = Object.keys(result).map(key => {
        const { weapon, displayName, outcome } = result[key];
        return (
          <div key={key}>{displayName} is {outcome}... choice of weapon: {weapon}</div>
        );
      });

      return (
        <div>
          {listResult}
          <div className={resetCx} onClick={this.onReset}>reset</div>
        </div>
      );
    }
    return (
      <div>
        Wel come to rock scissors paper
      </div>
    )
  }
}

const genWeaponCx = (gameState, type) => css({
  backgroundColor: gameState.weapon === type ? 'var(--c-teal)' : 'white'
}, buttonCx);

const rootCx = css`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`

const buttonCx = css({
  border: '1px var(--c-black) solid',
  borderRadius: '0.3rem',
  padding: '1rem',
  fontSize: '5rem'
});

const resetCx = css({
  border: '1px var(--c-black) solid',
  borderRadius: '0.3rem',
  padding: '1rem'
});

export default Rsp;
