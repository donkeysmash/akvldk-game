import { IUserModel, User } from '../models/user';
import { ISessionModel, Session } from '../models/session';

class GameRound {
  sessionId: string;
  session: ISessionModel;
  participants: Map<string, IUserModel>;
  connections: Map<string, string>;

  constructor(sessionId) {
    this.sessionId = sessionId;
    this.participants = new Map();
    this.connections = new Map();
  }
}


export default GameRound;