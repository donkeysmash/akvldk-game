import React, { Component } from 'react';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';
import _omit from 'lodash/omit'
import Weapons from './Weapons';

@inject('gameStore', 'userStore')
@observer
class OpponentResult extends Component {
  render() {
    const { gameStore, userStore } = this.props;
    const opponentHistory = _omit(gameStore.matchHistoryFormatted, userStore.userId);
    const opponentId = Object.keys(opponentHistory)[0];
    const extracted = opponentHistory[opponentId];
    const aggregated = aggregateRounds(extracted);
    const { weapon }  = gameStore.gameState.result[opponentId];
    return (
      <div className={rootCx}>
        <Weapons selected={weapon} onSelect={() => {}} />
        <div className={historyCx}>
          {aggregated.weapons.join(' ')}
        </div>
      </div>
    );
  }
}

const rootCx = css({

});
const countCx = css({
  fontWeight: 'bold'
});
const historyCx = css({
  fontSize: '1.3rem'
});

export function aggregateRounds(arrResults) {
  let aggregate = {
    winner: 0,
    draw: 0,
    loser: 0,
    weapons: []
  };

  for (let result of arrResults) {
    let weapon = '🤷';
    switch(result.weapon) {
      case 'rock':
        weapon = '✊';
        break;
      case 'scissors':
        weapon = '✌️';
        break;
      case 'paper':
        weapon = '✋';
        break
    }
    aggregate.weapons.push(weapon);
    aggregate[result.outcome]++;
  }
  aggregate.weapons = aggregate.weapons.slice(-10);
  return aggregate;
}

export default OpponentResult;