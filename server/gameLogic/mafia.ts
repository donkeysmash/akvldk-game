import shuffle from 'fisher-yates-shuffle';
import { IUserModel } from '../models/user';
import { withinRange } from '../utils';

export enum Roles {
  POLICE,
  MAFIA,
  DOCTOR,
  CITIZEN
}

enum Stage {
  READY_TO_START,
  INIT,
  DAY,
  CONVICT,
  JUDGE,
  NIGHT
}

export class Mafia {
  public stage: Stage;
  public participants: Map<string, IUserModel>;
  public numParty: number;

  constructor(participants: Map<string, IUserModel>) {
    this.participants = participants;
    this.stage = Stage.READY_TO_START;
    this.numParty = this.participants.size;
  }

  public startGame() {
    if (this.stage !== Stage.READY_TO_START) {
      throw new Error(`cannot start if current stage is READY_TO_START stage$${this.stage}`);
    }

    if (this.numParty < 5) {
      throw new Error(`at least 7 players are required numPlayers$${this.numParty}`);
    }
  }

  public assignRole(settings = {/* TODO have a custom settings for roles */}) {
    const shuffledUserId = shuffle(Array.from(this.participants.keys()));
    const { numMafia, numCitizen } = this.calcNumRoles();
  }

  private calcNumRoles() {
    let numMafia;
    if (withinRange(this.numParty, 5, 9)) {
      numMafia = 2;
    } else if (withinRange(this.numParty, 9, 13)) {
      numMafia = 3;
    } else {
      numMafia = 4;
    }
    const numCitizen = this.numParty - numMafia;
    return { numMafia, numCitizen };
  }
}