
import { computed, observable, action, reaction, toJS, values } from 'mobx';
import gameStore from './gameStore';

class PPStore {

  @observable voteValue;

  @action setVoteValue(value) {
    this.voteValue = value;
  }
}

export default new PPStore();