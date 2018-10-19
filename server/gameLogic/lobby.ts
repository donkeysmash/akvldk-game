import { IUserModel, User } from '../models/user';
import { ISessionModel, Session } from '../models/session';
import { GameTypes, ITurnGame, GameStateMsg } from './game';
import { Rsp } from "./Rsp";
import { io } from '../';
import { Socket, Namespace } from 'socket.io';

class Lobby {
  sessionId: string;
  session: ISessionModel;
  participants: Map<string, IUserModel>;
  connections: Map<string, Socket>;
  isLocked: boolean;
  inProgress: boolean;
  nsp: Namespace;
  game: ITurnGame;

  constructor(sessionId) {
    this.sessionId = sessionId;
    this.participants = new Map();
    this.connections = new Map();
    this.nsp = io.of(`/${sessionId}`);
    this.isLocked = false;
    this.inProgress = false;
  }

  async create() {
    this.session = await Session.findById(this.sessionId);
  }

  async addUser(userId: string) {
    if (!this.participants.has(userId)) {
      const user = await User.findById(userId);
      this.participants.set(userId, user);
    }
  }

  addConnection(userId: string, socket: Socket) {
    this.connections.set(userId, socket);
  }

  startGame(startState: any = {}) {
    this.inProgress = true;
    // TODO switch based on gameType
    this.game = new Rsp(this.participants);
    this.connections.forEach((socket, userId) => {
      console.log('init socket ', userId);
      socket.on('gameState', gameState => {
        console.log('gameState Received:', gameState);
        const newState = this.game.process(gameState, userId);
        console.log('processed:', newState);
        if (newState) {
          if (newState.target === 'all') {
            this.nsp.emit('gameState', newState.gameState);
          } else {
            const { target, gameState } =  newState;
            for (let t of target) {
              this.connections.get(t).emit('gameState', gameState);
            }
          }
        }
      });
    });
    const newState = this.game.process(startState);
    this.nsp.emit('gameState', newState.gameState);
  }

  forceSendGameState(userId: string) {
    console.log('forceSendGameState', userId, this.game.gameState);
    this.connections.get(userId).emit('gameState', this.game.gameState);
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
