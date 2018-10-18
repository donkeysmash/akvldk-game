import { IUserModel, User } from '../models/user';
import { ISessionModel, Session } from '../models/session';
import { GameTypes } from './game';
import { Rsp } from "./Rsp";
import { io } from '../';
import { Socket } from 'socket.io';

class Lobby {
  sessionId: string;
  session: ISessionModel;
  participants: Map<string, IUserModel>;
  connections: Map<string, Socket>;
  isLocked: boolean;

  constructor(sessionId) {
    this.sessionId = sessionId;
    this.participants = new Map();
    this.connections = new Map();
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

  addConnection(userId: string, socket: Socket) {
    this.connections.set(userId, socket);
  }

  startGame() {
    const nsp = io.of(`/${this.sessionId}`);
    const game = new Rsp(this.participants);
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
