import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import config from '../../config';
import nameStore from '../store/name';

class SessionView extends Component {
  state = {
    participants: []
  };

  async componentDidMount() {
    const { serverUri } = config;
    const name = nameStore.getName();
    const { sessionId } = this.props.match.params;
    this.socket = io.connect(`${config.socketUri}/${sessionId}`);
    this.socket.emit('name', name);
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