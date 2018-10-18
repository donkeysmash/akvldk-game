import React, { Component } from 'react';
import { css } from 'emotion';
import { withRouter } from 'react-router-dom';
import GameRoom from './GameRoom';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'gameStore', 'sessionStore')
@withRouter
@observer
class SessionView extends Component {
  constructor(props) {
    super(props);
    const { gameStore, userStore, sessionStore, match } = props;
    sessionStore.setCurrentSessionId(match.params.sessionId);
    if (!sessionStore.currentSession) {
      sessionStore.getSession(match.params.sessionId);
    }
    gameStore.connect();
  }

  onStartGame = () => {
    this.props.gameStore.startGame();
  }

  render() {
    const { gameStore, userStore, sessionStore } = this.props;
    if (sessionStore.isLoading) {
      return null;
    }

    if (gameStore.gameState.isStarted) {
      return <GameRoom />;
    }

    const { currentSession } = sessionStore;
    const { participants } = gameStore;
    const ps = participants.map((p, i) => <div key={i}>{p}</div>)
    const startGameButton =
        <div onClick={this.onStartGame} className={startGameCx}>Start game</div>;
    return (
      <div className={rootCx}>
        <div className={sessionNameCx}>
          {`[${currentSession.gameType}] - ${currentSession.name}`}
        </div>
        <div className={hostNameCx}>
            Created by
            <span className={displayNameCx}>{currentSession.host.displayName}</span>
        </div>
        <div className={participantsCx}>
          {ps}
        </div>
        {userStore.currentUser._id === currentSession.host._id && startGameButton}
      </div>
    );
  }
}

const rootCx = css({
  marginTop: '0.8rem'
});
const sessionNameCx = css({
  backgroundColor: 'black',
  color: 'aliceblue'
});
const hostNameCx = css({
  fontWeight: 'normal'
});
const displayNameCx = css({
  marginLeft: '0.5rem',
  fontWeight: 'bold',
  color: 'orange'
});
const participantsCx = css({
  color: 'blue'
});
const startGameCx = css({
  padding: '1rem',
  border: 'green 1px solid',
  borderRadius: '0.4rem',
  float: 'right'
});

export default SessionView;