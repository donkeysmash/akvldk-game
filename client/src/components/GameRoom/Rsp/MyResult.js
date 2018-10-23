import React, { Component } from 'react';
import { css } from 'emotion';
import { aggregateRounds } from './OpponentResult';
import { inject, observer } from 'mobx-react';
import _pick from 'lodash/pick';

@inject('gameStore', 'userStore')
@observer
class MyResult extends Component {
  render() {
    const { gameStore, userStore } = this.props;
    const outcomeHistory = _pick(gameStore.matchHistoryFormatted, userStore.userId);
    const extracted = outcomeHistory[Object.keys(outcomeHistory)[0]];
    const aggregated = aggregateRounds(extracted);
    return (
      <div className={rootCx}>
        <div className={countCx}>
          {aggregated.winner}-{aggregated.draw}-{aggregated.loser}
        </div>
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

export default MyResult;