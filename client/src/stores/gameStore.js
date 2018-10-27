import io from 'socket.io-client';
import sessionStore from './sessionStore';
import userStore from './userStore';
import { computed, observable, action, reaction, toJS } from 'mobx';
import config from '../../config';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty';

class GameStore {
  @observable participants = [];
  socket;
  @observable gameState = {};

  @action.bound connect() {
    this.gameState = {};
    if (this.socket && this.socket.connected) {
      this.leave();
    }
    const sessionId = sessionStore.currentSessionId;
    const uri = `${config.socketUri}/${sessionId}`;
    const {userId} = userStore;
    this.socket = io.connect(uri, {
      query: { userId }
    });
    this.socket.on('participants', this.setParticipants);
    this.socket.on('gameState', this.setGameState);
  }

  @action.bound setGameState(gameState) {
    this.gameState = gameState;
  }

  @action.bound setParticipants(participants) {
    this.participants = participants;
  }

  @action.bound emitGameState() {
    const forEmitGameState = toJS(this.gameState);
    console.log('emitting gameState', forEmitGameState);
    this.socket.emit('gameState', forEmitGameState);
  }

  @computed get isStarted() {
    return !_isEmpty(this.gameState);
  }

  startGame() {
    this.socket.emit('startGame', userStore.userId);
  }

  leave() {
    if (userStore.currentUser && this.socket && this.socket.connected) {
      this.gameState = {};
      this.socket.emit('leave', userStore.userId);
      this.socket.close();
    }
  }

  close() {
    this.socket.close();
  }
}

const gameStore = new GameStore();

export default gameStore;