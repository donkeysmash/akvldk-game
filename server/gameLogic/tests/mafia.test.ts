import { Mafia, Stage } from '../mafia';
import { expect } from 'chai';
import 'mocha';
import { IUserModel, User } from '../../models/user';


function genMockParticipants(targetSize: number, namePrefix = 'user'): Map<string, IUserModel> {
  const result: Map<string, IUserModel> = new Map();
  let id = 0;
  while (result.size < targetSize) {
    const displayName = `${namePrefix}${id++}`
    const user = new User({ displayName });
    result.set(displayName, user);
  }
  return result;
}

let mockParticipants: Map<string, IUserModel> = genMockParticipants(7);

describe('Mafia Game Logic', () => {
  it('can instantiate', () => {
    const mafia = new Mafia(mockParticipants);
    expect(mafia.numParty).to.equal(7);
    expect(mafia.stage).to.equal(Stage.READY_TO_START);
  });
});