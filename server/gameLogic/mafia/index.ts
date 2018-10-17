import { IUserModel } from '../../models/user';
import { withinRange, fyShuffle } from '../../utils';
import { Game } from '../game';

export enum Roles {
  UNASSIGNED,
  POLICE,
  MAFIA,
  DOCTOR,
  CITIZEN
}

export enum Stage {
  READY_TO_START,
  INIT,
  DAY,
  CONVICT,
  JUDGE,
  NIGHT
}

export class Mafia implements Game {
  public stage: Stage;
  public participants: Map<string, IUserModel>;
  public numParty: number;
  public roles: Map<string, Roles>;

  constructor(participants: Map<string, IUserModel>) {
    this.participants = participants;
    this.stage = Stage.READY_TO_START;
    this.numParty = this.participants.size;
    this.roles = new Map();
    participants.forEach((v, k) => {
      this.roles.set(k, Roles.UNASSIGNED);
    });
  }

  public startGame() {
    if (this.stage !== Stage.READY_TO_START) {
      throw new Error(`cannot start if current stage is READY_TO_START stage$${this.stage}`);
    }

    if (this.numParty < 5) {
      throw new Error(`at least 5 players are required numPlayers$${this.numParty}`);
    }
  }

  public assignRole(settings = {/* TODO have a custom settings for roles */}) {
    const shuffledUserId = fyShuffle(Array.from(this.participants.keys()));
    let { numMafia, numCitizen } = this.calcNumRoles();
    for (let userId of shuffledUserId) {
      if (numMafia > 0) {
        this.roles.set(userId, Roles.MAFIA);
        numMafia--;
      } else if (numCitizen > 0) {
        this.roles.set(userId, Roles.CITIZEN);
        numCitizen--;
      }
    }
  }

  private calcNumRoles() {
    let numMafia;
    if (!this.numParty || this.numParty < 5) {
      throw new Error(`at least 5 players are required to calculate numRoles`);
    } else if (withinRange(this.numParty, 5, 9)) {
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