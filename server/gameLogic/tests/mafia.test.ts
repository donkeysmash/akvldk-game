import { Mafia, Stage, Roles } from '../mafia';
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
const DEFAULT_PARTY_SIZE = 7;
let mockParticipants: Map<string, IUserModel> = genMockParticipants(DEFAULT_PARTY_SIZE);

describe('Mafia Game Logic', () => {
  describe('contructor', () => {
    let mafia: Mafia;
    beforeEach(() => {
      mafia = new Mafia(mockParticipants);
    });

    it('can instantiate', () => {
      expect(mafia.numParty).to.equal(DEFAULT_PARTY_SIZE);
      expect(mafia.stage).to.equal(Stage.READY_TO_START);
      for (let i = 0; i < 7; ++i) {
        expect(mafia.participants.get(`user${i}`).displayName).to.equal(`user${i}`);
      }
    });

    it('initiate role map', () => {
      const {roles} = mafia;
      expect(roles instanceof Map).to.eql(true);
      expect(roles.size).to.eql(DEFAULT_PARTY_SIZE);
      expect(Array.from(roles.values()).every(v => v === Roles.UNASSIGNED)).to.equal(true);
    });
  });

  describe('assign Role', () => {
    let mafia = new Mafia(mockParticipants);

  });


});