import { Client } from 'colyseus.js';
import { observable, action, reaction } from 'mobx';
import sessionStore from './sessionStore';
import userStore from './userStore';
import config from '../../config';

// maybe make them socket as observers

class GameStore {
  @observable participants = [];
  client = new Client('ws://localhost:3000');

  connect() {
    const sessionId = sessionStore.currentSessionId;
    // const uri = `${config.socketUri}/${sessionId}`;
    const {userId} = userStore
    this.client.connect(userId);
    this.client.join('mafia')
  }

  @action.bound setParticipants(participants) {
    this.participants = participants;
  }
}



export default new GameStore();