import { IUserModel } from '../models/user';

export interface Game {
  participants: Map<string, IUserModel>;
};