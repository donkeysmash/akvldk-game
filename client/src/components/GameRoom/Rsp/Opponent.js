import React, { Component } from 'react';
import { css } from 'emotion';
import Weapons from './Weapons';
import { inject, observer } from 'mobx-react';

@inject('gameStore', 'userStore')
@observer
class Opponent extends Component {
  render() {
    const { displayName } = this.props.userStore;
    const opponentDpName = this.props.gameStore.participants.filter(v => v !== displayName)[0] || '';
    return (
      <div className={rootCx}>
        <div className={weaponContainerCx}>
          <Weapons onSelect={() => {}} />
        </div>
        <div className={dpNameCx}>{opponentDpName}</div>
      </div>
    );
  }
}

const rootCx = css({

});

const weaponContainerCx = css({
  filter: 'blur(7px)',
  position: 'relative'
});

const dpNameCx = css({
  marginTop: '0.3rem',
  textAlign: 'center'
});


export default Opponent;