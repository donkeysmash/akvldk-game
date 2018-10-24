import React, { Component } from 'react';
import { css } from 'emotion';
import { aggregateRounds } from './OpponentResult';
import Weapons from './Weapons';
import { inject, observer } from 'mobx-react';
import _pick from 'lodash/pick';

@inject('gameStore', 'userStore')
@observer
class MyResult extends Component {
  render() {
    const { gameStore, userStore } = this.props;
    const outcomeHistory = _pick(gameStore.matchHistoryFormatted, userStore.userId);
    const aggregated = aggregateRounds(outcomeHistory[userStore.userId]);
    const { outcome, weapon }  = gameStore.gameState.result[userStore.userId];
    const outcomeMsg = <div>{outcome}!</div>
    return (
      <div className={rootCx}>
        {outcomeMsg}
        <div className={countCx}>
          {aggregated.winner}-{aggregated.draw}-{aggregated.loser}
        </div>
        <div className={historyCx}>
          {aggregated.weapons.join(' ')}
        </div>
        <Weapons onSelect={() => {}} selected={weapon} />
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

export default MyResult;