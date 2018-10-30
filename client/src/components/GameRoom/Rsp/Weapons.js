import React, { Component } from 'react';
import { css } from 'emotion';

class Weapons extends Component {
  render() {
    const { selected } = this.props;
    const rockCx = genWeaponCx(selected, 'rock');
    const paperCx = genWeaponCx(selected, 'paper');
    const scissorsCx = genWeaponCx(selected, 'scissors');
    return (
      <div className={btnRootCx}>
        <div className={rockCx} onClick={() => this.props.onSelect('rock')}>✊</div>
        <div className={paperCx} onClick={() => this.props.onSelect('paper')}>✋</div>
        <div className={scissorsCx} onClick={() => this.props.onSelect('scissors')}>✌️</div>
      </div>
    );
  }
}

const genWeaponCx = (selected, type) => css({
  backgroundColor: selected === type ? 'var(--c-teal)' : 'white'
}, buttonCx);

const btnRootCx = css`
  display: flex;
  justify-content: space-between;
`;

const buttonCx = css({
  border: '1px var(--c-black) solid',
  borderRadius: '0.3rem',
  padding: '1rem',
  fontSize: '5rem'
});

export default Weapons;