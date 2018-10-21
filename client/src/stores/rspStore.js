
import { observable, action, reaction, toJS } from 'mobx';
import gameStore from './gameStore';

class RspStore {
  @observable seconds;
  @observable weapon;

  @action.bound setWeapon(weapon) {
    this.weapon = weapon;
  }

  @action.bound setSeconds(s) {
    this.seconds = s;
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
    if (seconds === 0) {
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
