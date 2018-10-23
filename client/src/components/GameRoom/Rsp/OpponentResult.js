import React, { Component } from 'react';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';
import _omit from 'lodash/omit'

@inject('gameStore', 'userStore')
@observer
class OpponentResult extends Component {
  render() {
    const { gameStore, userStore } = this.props;
    const opponentHistory = _omit(gameStore.matchHistoryFormatted, userStore.userId);
    const extracted = opponentHistory[Object.keys(opponentHistory)[0]];
    const aggregated = aggregateRounds(extracted);
    return (
      <div>
        <div>
          {aggregated.winner}-{aggregated.draw}-{aggregated.loser}
        </div>
        <div>
          {aggregated.weapons.join(' ')}
        </div>
      </div>
    );
  }
}

export function aggregateRounds(arrResults) {
  let aggregate = {
    winner: 0,
    draw: 0,
    loser: 0,
    weapons: []
  };

  for (let result of arrResults) {
    let weapon;
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
      default:
        weapon = '🤷';
        break;
    }
    aggregate.weapons.push(weapon);
    aggregate[result.outcome]++;
  }
  aggregate.weapons = aggregate.weapons.slice(-10);
  return aggregate;
}

export default OpponentResult;