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
    const { seconds } = this.props.rspStore;
    const rootCx = css`
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        width: 20vw;
      }
    `;
    const vsCx = css`
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
    `;
    const countDownCx = css`
      font-size: 2rem;
    `;
    const hideReset = seconds === 0 ? 'block': 'hidden';
    const resetCx = css({
      border: '1px var(--c-black) solid',
      borderRadius: '0.3rem',
      visibility: hideReset
    });

    return (
      <div className={rootCx}>
        <div className={countDownCx}>{seconds}</div>
        <div className={vsCx}>
          vs
        </div>
        <div className={resetCx} onClick={this.onReset}>
          reset
        </div>
      </div>
    );
  }
}


export default MiddleGround;