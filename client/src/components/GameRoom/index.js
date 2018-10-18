import React, { Component } from 'react'
import Rsp from './Rsp';

@inject('gameStore', 'sessionStore')
@observer
class GameTypes extends Component {
  render() {
    const { sessionStore } = this.props;
    const { gameType } = sessionStore.currentSession;
    switch (gameType) {
    case 'RSP':
    default:
      return <Rsp />;
    }
  }
}

export default GameTypes;
