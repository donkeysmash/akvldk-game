import { Session } from '../models/session';
import GameRound from './gameRound';

const activeGames: Map<string, GameRound> = new Map();


// Maintain sessions on memory it could be redis eventually