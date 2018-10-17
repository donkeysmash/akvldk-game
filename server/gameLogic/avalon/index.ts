import { IUserModel } from '../../models/user';

enum Stage {
  READY_TO_START,
  INIT,
  DAY,
  CONVICT,
  JUDGE,
  NIGHT
}

export class Avalon {
  public stage: Stage;
}