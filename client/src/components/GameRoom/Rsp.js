import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

const SUBMIT = 'SUBMIT';

@inject('gameStore')
@observer
class Rsp extends Component {
  onClickHandler = e => {
    const { setGameState, gameState, emitGameState } = this.props.gameStore;
    setGameState({ ...gameState, weapon: e });
    emitGameState();
  }

  render() {
    const { gameState } = this.props.gameStore;
    if (gameState.stage === SUBMIT) {
      return (
        <div>
          <div onClick={this.onClickHandler.bind(this, 'rock')}>rock</div>
          <div onClick={this.onClickHandler.bind(this, 'paper')}>paper</div>
          <div onClick={this.onClickHandler.bind(this, 'scissors')}>scissors</div>
        </div>
      )
    }




    return (
      <div>
        Wel come to rock scissors paper
      </div>
    )
  }
}

export default Rsp;
