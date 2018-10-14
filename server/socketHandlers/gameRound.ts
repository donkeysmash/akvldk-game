import { IUserModel, User } from '../models/user';
import { ISessionModel, Session } from '../models/session';


class GameRound {
  sessionId: string;
  session: ISessionModel;
  participants: Map<string, IUserModel>;

  constructor(sessionId) {
    this.sessionId = sessionId;
    this.participants = new Map();
  }

  async create() {
    this.session = await Session.findById(this.sessionId);
  }

  async addUser(userId) {
    const user = await User.findById(userId);
    this.participants.set(userId, user);
  }

  removeUser(userId) {
    this.participants.delete(userId);
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