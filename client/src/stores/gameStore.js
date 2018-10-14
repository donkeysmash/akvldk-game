import io from 'socket.io-client';
import sessionStore from './sessionStore';
import userStore from './userStore';
import { observable, action, reaction } from 'mobx';
import config from '../../config';

// maybe make them socket as observers

class GameStore {
  @observable participants = [];
  socket;

  @action joinGame() {
    const sessionId = sessionStore.currentSessionId;
    const uri = `${config.socketUri}/${sessionId}`;
    this.socket = io.connect(uri);
    this.socket.emit('join', userStore.userId);
    this.socket.on('participants',
      (participants) => this.participants = participants)
  }
}



export default new GameStore();