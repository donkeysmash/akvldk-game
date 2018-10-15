import io from 'socket.io-client';
import sessionStore from './sessionStore';
import userStore from './userStore';
import { observable, action, reaction } from 'mobx';
import config from '../../config';

// maybe make them socket as observers

class GameStore {
  @observable participants = [];

  connect() {
    const sessionId = sessionStore.currentSessionId;
    const uri = `${config.socketUri}/${sessionId}`;
    const {userId} = userStore
  }

  @action.bound setParticipants(participants) {
    this.participants = participants;
  }
}



export default new GameStore();