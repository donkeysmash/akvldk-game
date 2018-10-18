import { IUserModel, User } from '../models/user';
import { ISessionModel, Session } from '../models/session';
import { GameTypes } from './game';
import { Rps } from './rps';
import { Socket } from 'socket.io';

class Lobby {
  sessionId: string;
  session: ISessionModel;
  participants: Map<string, IUserModel>;
  isLocked: boolean;

  constructor(sessionId) {
    this.sessionId = sessionId;
    this.participants = new Map();
    this.isLocked = false;
  }

  async create() {
    this.session = await Session.findById(this.sessionId);
  }

  async addUser(userId: string) {
    if (!this.isLocked && !this.participants.has(userId)) {
      const user = await User.findById(userId);
      this.participants.set(userId, user);
    }
  }

  startGame(socket: Socket) {
    switch(this.session.gameType) {
      case GameTypes.RSP:
        return (new Rps(this.participants, socket)).run();
    }
  }


  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  getHostId(): string {
    return this.session.host.id;
  }

  removeUser(userId: string): boolean {
    return this.participants.delete(userId);
  }

  extractDisplayNames(): string[] {
    const userModels = Array.from(this.participants.values());
    return userModels.reduce((acc, v) => {
      acc.push(v.displayName);
      return acc;
    }, new Array<string>());
  }
}

export default Lobby;
