import { Game, GameTypes } from "../game";
import { IUserModel } from "../../models/user";


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



export class Rps implements Game {
  gameType: GameTypes;
  stageGenerator: Iterator<RpsStage>
  public participants: Map<string, IUserModel>;
  public currentStage: RpsStage;

  constructor(participants: Map<string, IUserModel>) {
    this.gameType = GameTypes.RSP;
    this.participants = participants;
    this.stageGenerator = genStage();
    this.currentStage = this.stageGenerator.next().value;
  }

}