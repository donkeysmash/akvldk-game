import { ITurnGame, GameTypes, GameStateMsg } from "../game";
import { IUserModel } from "../../models/user";

export enum PPStage {
  VOTE = 'VOTE',
  READY = 'READY'
}

export class PlanningPoker implements ITurnGame {
  gameType: GameTypes;
  gameState: object;
  public participants: Map<string, IUserModel>; // userid, usermodel
  public votes: Map<string, number>; //userid, weaponchoice
  public endGame: Function;
  public timeLeft: number;
  public timer: NodeJS.Timer;
  public emit: Function;
  public history: Array<object>;
  public hostId: string;


  constructor(hostId, participants, endGame, forceSend) {
    this.hostId = hostId;
    this.gameType = GameTypes.PLANNING_POKER;
    this.participants = participants;
    this.votes = new Map();
    this.endGame = endGame;
    this.emit = forceSend;
    this.history = [];
  }

  public process(gameState: any, userId: string): GameStateMsg | void {
    if (this.participants.size <= 1) {
      return this.endGame({});
    }
    if (!gameState.isStarted) {
      this.gameState = {
        ...gameState,
        isStarted: true,
        stage: PPStage.READY
      };
      return { gameState: this.gameState, target: 'all' };
    }
  }
}