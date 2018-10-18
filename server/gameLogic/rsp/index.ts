import { ITurnGame, GameTypes, GameState } from "../game";
import { IUserModel } from "../../models/user";
import { Socket } from "socket.io";


export enum Weapon {
  ROCK = 'ROCK',
  SCISSORS = 'SCISSORS',
  PAPER = 'PAPER'
}

export enum RpsStage {
  SUBMIT = 'SUBMIT',
  JUDGE = 'JUDGE'
}

function* genStage() {
  while (true) {
    yield RpsStage.SUBMIT;
    yield RpsStage.JUDGE;
  }
}



export class Rsp implements ITurnGame {
  gameType: GameTypes;
  stageGenerator: Iterator<RpsStage>
  public socket: Socket;
  public participants: Map<string, IUserModel>;
  public currentStage: RpsStage;

  constructor(participants: Map<string, IUserModel>) {
    this.gameType = GameTypes.RSP;
    this.participants = participants;
    this.stageGenerator = genStage();
    this.currentStage = this.stageGenerator.next().value;
  }

  public run(gameState: GameState): GameState {
    return {
      isStarted: true
    }
  }
}