import { IUserModel, User } from '../models/user';
import { ISessionModel, Session } from '../models/session';
import { Socket } from 'socket.io';

class GameRound {
  sessionId: string;
  session: ISessionModel;
  participants: Map<string, IUserModel>;
  connections: Map<string, string>; // socketID, userID

  constructor(sessionId) {
    this.sessionId = sessionId;
    this.participants = new Map();
    this.connections = new Map();
  }

  async create() {
    this.session = await Session.findById(this.sessionId);
  }

  async addUser(userId: string, socket: Socket) {
    this.connections.set(socket.conn.id, userId);
    if (!this.participants.has(userId)) {
      const user = await User.findById(userId);
      this.participants.set(userId, user);
    }
  }

  removeConnection(socket: Socket): string {
    const {id} = socket.conn;
    if (this.connections.has(id)) {
      const userId = this.connections.get(id);
      this.connections.delete(id);
      return userId;
    }
    return null;
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


export default GameRound;