import React, { Component } from 'react';
import io from 'socket.io-client';
import config from '../../config';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@withRouter
@observer
class SessionView extends Component {
  state = {
    participants: []
  };

  async componentDidMount() {
    const { displayName } = this.props.userStore;
    const { sessionId } = this.props.match.params;
    this.socket = io.connect(`${config.socketUri}/${sessionId}`);
    this.socket.emit('name', displayName);
    this.socket.on('participants', this.updateParticipants);
  }

  updateParticipants = (participants) => {
    this.setState({ participants });
  }

  render() {
    const { participants } = this.state;
    return (
      <div>
        {participants.map(p => <div key={p}>{p}</div>)}
      </div>
    );
  }
}

export default SessionView;