import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import config from '../../config';
import nameStore from '../store/name';

class SessionView extends Component {

  async componentDidMount() {
    const { serverUri } = config;
    const name = nameStore.getName();
    const { sessionId } = this.props.match.params;
    this.socket = io.connect(`${config.socketUri}`);
    this.socket.on('hello', data => {
      console.log(data);
    });
  }

  onClickSend = () => {
    this.socket.emit('donkey', 'haha');
  }

  onClickGo = () => {
    this.socket.emit('smash', 'meloo');
  }



  render() {
    return (
      <div>
        Hello World!
        <button onClick={this.onClickSend}>send</button>
        <button onClick={this.onClickGo}>go</button>
      </div>
    );
  }
}

export default SessionView;