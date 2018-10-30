import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import Rsp from './Rsp';
import PlanningPoker from './PlanningPoker';

@inject('gameStore', 'sessionStore')
@observer
class GameTypes extends Component {
  render() {
    const { sessionStore } = this.props;
    const { gameType } = sessionStore.currentSession;
    switch (gameType) {
    case 'PLANNING_POKER':
      return <PlanningPoker />;
    case 'RSP':
    default:
      return <Rsp />;
    }
  }
}

export default GameTypes;
