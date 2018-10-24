import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { css } from 'emotion';

@inject('gameStore', 'userStore', 'rspStore')
@observer
class MiddleGround extends Component {
  onReset = () => {
    const { setGameState, gameState, emitGameState } = this.props.gameStore;
    this.props.rspStore.setWeapon(null);
    const newGameState = {
      isStarted: false
    };
    setGameState(newGameState);
    emitGameState();
  };

  render() {
    const { stage } = this.props.gameStore.gameState;
    if (stage === 'JUDGE') {
      const btnCx = css`
        padding: 0.5rem;
      `;
      return (
        <button className={btnCx} onClick={this.onReset}>
          reset
        </button>
      );
    }
    const { seconds } = this.props.rspStore;
    const rootCx = css`
      font-size: 3rem;
      text-align: center;
    `;
    return (
      <div className={rootCx}>
        {seconds}
      </div>
    );
  }
}


export default MiddleGround;