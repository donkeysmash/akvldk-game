import React, { Component } from 'react';
import { css } from 'emotion';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'gameStore', 'sessionStore')
@withRouter
@observer
class SessionView extends Component {
  constructor(props) {
    super(props);
    const { gameStore, userStore, sessionStore, match } = props;
    sessionStore.setCurrentSessionId(match.params.sessionId);
    // gameStore.join(userStore.userId);
  }

  render() {
    const { gameStore, userStore, sessionStore } = this.props;
    const { currentSession } = sessionStore;
    return (
      <div className={rootCx}>
        <div className={sessionNameCx}>{currentSession.name}</div>
        <div className={hostNameCx}>
            Created by
            <span className={displayNameCx}>{currentSession.host.displayName}</span>
        </div>
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

export default SessionView;