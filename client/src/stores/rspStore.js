
import { computed, observable, action, reaction, toJS } from 'mobx';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map'
import gameStore from './gameStore';

class RspStore {
  @observable seconds;
  @observable weapon;
  @observable isCountingDown = false;

  @action setCountingDown() {
    this.isCountingDown = true;
  }

  @action resetCountingDown() {
    this.isCountingDown = false;
  }

  @action.bound setWeapon(weapon) {
    this.weapon = weapon;
  }

  @action.bound setSeconds(s) {
    this.seconds = s;
  }

  @computed get matchHistoryFormatted() {
    const result = _reduce(gameStore.gameState.history, (acc, v) => {
      _map(v, (value, key) => {
        if (!acc[key]) {
          acc[key] = [value];
        } else {
          acc[key].push(value);
        }
      });
      return acc;
    }, {});
    return result;
  }
}

const rspStore = new RspStore();

reaction(
  () => gameStore.gameState.timeLeft,
  (timeLeft) => rspStore.setSeconds(timeLeft)
);

reaction(
  () => gameStore.gameState.stage,
  (stage) => stage === 'SUBMIT' && rspStore.setWeapon(null)
);

reaction(
  () => rspStore.seconds,
  (seconds) => {
    if (!rspStore.isCountingDown && seconds > 0) {
      rspStore.setCountingDown();
    } else if (rspStore.isCountingDown && seconds === 0) {
      const currentState = gameStore.gameState;
      gameStore.setGameState({
        ...currentState,
        weapon: rspStore.weapon
      });
      gameStore.emitGameState();
    }
  }
)


export default rspStore;
