import { ITurnGame, GameTypes, GameStateMsg } from "../game";
import { IUserModel } from "../../models/user";

export enum PPStage {
  VOTE = 'VOTE',
  REVEAL = 'REVEAL'
}

export class PlanningPoker implements ITurnGame {
  gameType: GameTypes;
  gameState: object;
  public stage: PPStage;
  public participants: Map<string, IUserModel>; // userid, usermodel
  public votes: Map<string, number>; //userid, weaponchoice
  public endGame: Function;
  public timeLeft: number;
  public timer: NodeJS.Timer;
  public emit: Function;
  public history: Array<object>;
  public hostId: string;
  public host: IUserModel;
  public voters: Array<IUserModel>;

  constructor(hostId, participants, endGame, forceSend) {
    this.hostId = hostId;
    this.gameType = GameTypes.PLANNING_POKER;
    this.participants = participants;
    this.votes = new Map();
    this.endGame = endGame;
    this.emit = forceSend;
    this.history = [];
    this.host = this.participants.get(hostId);
    this.voters = [];
    for (let [userId, user] of this.participants.entries()) {
      if (userId !== hostId) {
        this.voters.push(user)
      }
    }
  }

  resetVotes(): void {
    for (let userId of this.participants.keys()) {
      this.votes.set(userId, null);
    }
  }

  public process(gameState: any, userId: string): GameStateMsg | void {
    if (this.participants.size <= 1) {
      return this.endGame({});
    }
    if (!gameState.isStarted) {
      this.resetVotes();
      this.gameState = {
        ...gameState,
        isStarted: true,
        stage: PPStage.VOTE,
      };
      return { gameState: this.gameState, target: 'all' };
    }

    if (userId === this.hostId) {
      if (gameState.action === PPStage.REVEAL) {
        this.stage = PPStage.REVEAL;
        this.gameState = {
          ...this.gameState,
          stage: PPStage.REVEAL,
          votes: this.votesToMsg()
        };
      } else if (gameState.action === PPStage.VOTE) {
        this.stage = PPStage.VOTE;
        this.resetVotes();
        this.gameState = {
          ...this.gameState,
          stage: PPStage.VOTE
        };
      } else {

      }
      return { gameState: this.gameState, target: 'all' };
    }
    this.votes.set(userId, gameState.vote);
    if (gameState.stage === PPStage.REVEAL)  {
      this.gameState = {
        ...this.gameState,
        stage: PPStage.REVEAL,
        votes: this.votesToMsg()
      };
      return { gameState: this.gameState, target: 'all' };
    }
  }

  votesToMsg(): { id: string, displayName: string, value: number }[] {
    return Object.keys(this.votes).reduce((acc, key) => {
      const participant = this.participants.get(key);
      const { id, displayName } = participant;
      const msg = {
        id,
        displayName,
        value: this.votes[key]
      };
      acc.push(msg);
      return acc;
    }, []);
  }
}