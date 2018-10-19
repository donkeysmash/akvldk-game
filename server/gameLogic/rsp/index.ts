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

function genResult(participants: Map<string, IUserModel>, weapons: Map<string, string>): object {
  const weaponSet = new Set(weapons.values());
  let winningWeapon;
  if (weaponSet.size === 2) {
    if (['rock', 'paper'].every(v => weaponSet.has(v))) {
      winningWeapon = 'paper';
    } else if (['rock', 'scissors'].every(v => weaponSet.has(v))) {
      winningWeapon = 'rock';
    } else {
      winningWeapon = 'scissors';
    }
  } else {
    winningWeapon = 'draw';
  }

  const winnerList = [];
  for (let [userId, weapon] of weapons.entries()) {
    if (weapon === winningWeapon) {
      winnerList.push(userId);
    }
  }
  const computeOutcome = (userId) => {
    if (winningWeapon === 'draw') {
      return 'draw';
    }
    if (winnerList.indexOf(userId) > -1) {
      return 'winner';
    }
    return 'loser';
  }

  const result = {};
  for (let [userId, user] of participants.entries()) {
    result[userId] = {
      weapon: weapons.get(userId),
      displayName: user.displayName,
      outcome: computeOutcome(userId)
    };
  }
  console.log(result);
  return result;
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
    this.weapons = new Map();
  }

  public process(gameState: any, userId: string): GameStateMsg | void {
    if (!gameState.isStarted) {
      this.weapons = new Map();
      this.gameState = { isStarted: true, stage: RpsStage.SUBMIT };
      return { gameState: this.gameState, target: 'all' };
    }
    this.weapons.set(userId, gameState.weapon);
    if (this.weapons.size === this.participants.size) {
      this.currentStage = RpsStage.JUDGE
      this.gameState = {
        ...this.gameState,
        stage: this.currentStage,
        result: genResult(this.participants, this.weapons)
      };
      return {
        gameState: this.gameState,
        target: 'all'
      };
    }
  }

  public emit(): GameStateMsg {
    return {
      target: 'all',
      gameState: this.gameState
    };
  }
}