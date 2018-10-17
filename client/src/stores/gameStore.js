import io from 'socket.io-client';
import sessionStore from './sessionStore';
import userStore from './userStore';
import { observable, action, reaction } from 'mobx';
import config from '../../config';

class GameStore {
  @observable participants = [];
  socket;

  connect() {
    const sessionId = sessionStore.currentSessionId;
    const uri = `${config.socketUri}/${sessionId}`;
    const {userId} = userStore
    this.socket = io.connect(uri, {
      query: { userId }
    });
    this.socket.on('participants', this.setParticipants);
  }

  @action.bound setParticipants(participants) {
    this.participants = participants;
  }

  leave() {
    this.socket.emit('leave', userStore.userId);
  }

  close() {
    this.socket.close();
  }
}



export default new GameStore();