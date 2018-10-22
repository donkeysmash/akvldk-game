import * as _ from 'lodash';
import { ITurnGame, GameTypes, GameStateMsg } from "../game";
import { IUserModel } from "../../models/user";
import { Socket } from "socket.io";

export enum RpsStage {
  SUBMIT = 'SUBMIT',
  JUDGE = 'JUDGE'
}

export class Rsp implements ITurnGame {
  static playerRange = { min: 2, max: 2 };
  gameState: object;
  gameType: GameTypes;
  stageGenerator: Iterator<RpsStage>
  public socket: Socket;
  public participants: Map<string, IUserModel>; // userid, usermodel
  public currentStage: RpsStage;
  public weapons: Map<string, string>; //userid, weaponchoice
  public endGame: Function;
  public timeLeft: number;
  public timer: NodeJS.Timer;
  public emit: Function;

  constructor(participants, endGame, forceSend) {
    this.gameType = GameTypes.RSP;
    this.participants = participants;
    this.weapons = new Map();
    this.endGame = endGame;
    this.emit = forceSend;
  }

  public process(gameState: any, userId: string): GameStateMsg | void {
    if (this.participants.size <= 1) {
      return this.endGame({});
    }
    if (!gameState.isStarted) {
      this.weapons = new Map();
      this.currentStage = RpsStage.SUBMIT;
      clearInterval(this.timer);
      this.timer = null;
      this.timeLeft = 5;
      this.gameState = {
        ...gameState,
        isStarted: true,
        stage: this.currentStage,
        timeLeft: this.timeLeft
      };
      this.emitTimeLeft();
      return { gameState: this.gameState, target: 'all' };
    }
    this.weapons.set(userId, gameState.weapon);
    if (this.weapons.size === this.participants.size) {
      this.currentStage = RpsStage.JUDGE
      this.gameState = {
        ...this.gameState,
        stage: this.currentStage,
        result: this.genResult()
      };
      this.gameState = _.omit(this.gameState, 'timer');
      return {
        gameState: this.gameState,
        target: 'all'
      };
    }
  }

  public emitTimeLeft(interval = 1000) {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1;
        this.gameState = {
          ...this.gameState,
          timeLeft: this.timeLeft
        }
        this.emit();
      }
    }, interval);
  }

  genResult(): object {
    const weaponSet = new Set(this.weapons.values());
    if (weaponSet.has('unknown') || weaponSet.has(null)) {
      const result = {};
      for (let [userId, weapon] of this.weapons.entries()) {
        result[userId] = {
          weapon,
          displayName: this.participants.get(userId).displayName,
          outcome: weapon === 'unknown' || weapon === null ? 'loser' : 'winner'
        }
      }
      return result;
    }

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
    for (let [userId, weapon] of this.weapons.entries()) {
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
    for (let [userId, user] of this.participants.entries()) {
      result[userId] = {
        weapon: this.weapons.get(userId),
        displayName: user.displayName,
        outcome: computeOutcome(userId)
      };
    }
    console.log(result);
    return result;
  }
}