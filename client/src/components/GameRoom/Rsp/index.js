import React, { Component } from 'react'
import { css } from 'emotion';
import MiddleGround from './MiddleGround';
import Opponent from './Opponent';
import MyChoice from './MyChoice';
import { inject, observer } from 'mobx-react';

@inject('gameStore')
@observer
class Rsp extends Component {
  render() {
    return (
      <div className={rootCx}>
        <Opponent />
        <MiddleGround />
        <MyChoice />
      </div>
    );
  }
}


const rootCx = css({
  marginTop: '0.7rem',
  height: '77vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export default Rsp;
