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
      return (
        <div>
          <div className={buttonCx} onClick={this.onClickHandler.bind(this, 'rock')}>rock</div>
          <div className={buttonCx} onClick={this.onClickHandler.bind(this, 'paper')}>paper</div>
          <div className={buttonCx} onClick={this.onClickHandler.bind(this, 'scissors')}>scissors</div>
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
          <div className={buttonCx} onClick={this.onReset}>reset</div>
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

const buttonCx = css({
  border: '1px purple solid',
  margin: '1rem'
});

export default Rsp;
