import { ITurnGame, GameTypes, GameStateMsg } from "../game";
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
  gameState: object;
  gameType: GameTypes;
  stageGenerator: Iterator<RpsStage>
  public socket: Socket;
  public participants: Map<string, IUserModel>;
  public currentStage: RpsStage;
  public weapons: Map<string, string>;

  constructor(participants: Map<string, IUserModel>) {
    this.gameType = GameTypes.RSP;
    this.participants = participants;
    this.stageGenerator = genStage();
    this.currentStage = this.stageGenerator.next().value;
  }

  public process(gameState: any, userId: string): GameStateMsg | void {
    if (!gameState.isStarted) {
      this.gameState = {
        isStarted: true,
        stage: this.currentStage
      };
      return {
        gameState: this.gameState,
        target: 'all'
      };
    }
    if (this.weapons.size === this.participants.size) {
      // return result
    }




  }

  public emit(): GameStateMsg {
    return {
      target: 'all',
      gameState: this.gameState
    };
  }
}