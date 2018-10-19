import { IUserModel } from '../models/user';
import { Socket } from 'socket.io';

export interface ITurnGame {
  gameType: GameTypes;
  gameState: object;
  process(gameState: any, userId?: string): any;
}

export interface GameStateMsg {
  gameState: object;
  target: 'all' | string[]
}

export enum GameTypes {
  MAFIA = 'MAFIA',
  AVALON = 'AVALON',
  RSP = 'RSP',
  INVALID = 'INVALID'
}

export function toGameTypes(gameType: string): GameTypes {
  const type = gameType.toUpperCase();
  switch (type) {
    case GameTypes.MAFIA:
      return GameTypes.MAFIA;
    case GameTypes.AVALON:
      return GameTypes.AVALON;
    case GameTypes.RSP:
      return GameTypes.RSP;
    default:
      return GameTypes.INVALID;
  }
}