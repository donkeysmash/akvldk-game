import React, { Component } from 'react';
import { css } from 'emotion';
import Weapons from './Weapons';
import { inject, observer } from 'mobx-react';

@inject('gameStore', 'userStore')
@observer
class Opponent extends Component {
  render() {
    const { gameStore, userStore } = this.props;
    const { displayName } = userStore;
    const opponentDpName = this.props.gameStore.participants.filter(v => v !== displayName)[0] || '';
    const result = gameStore.opponentResult;
    return (
      <div className={rootCx}>
        {result.outcome && <div>{result.outcome}</div>}
        <div className={weaponContainerCx}>
          <Weapons onSelect={() => {}} selected={result.weapon} />
        </div>
        <div className={dpNameCx}>{opponentDpName}</div>
      </div>
    );
  }
}

const rootCx = css({

});

const weaponContainerCx = css({

});

const dpNameCx = css({
  marginTop: '0.3rem',
  textAlign: 'center'
});


export default Opponent;