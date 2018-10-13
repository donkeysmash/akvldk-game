import axios from 'axios';
import { observable, action, reaction, computed } from 'mobx';
import config from '../../config';

const KEY_NAME = 'akvldk-game-displayName';
const axiosConfig = {
  baseURL: config.serverUri,
  url: '/user',
};

class UserStore {
  @observable currentUser;
  @observable isLoading;
  @observable displayName = window.localStorage.getItem(KEY_NAME)

  constructor() {
    reaction(
      () => this.displayName,
      displayName => {
        if (displayName) {
          window.localStorage.setItem(KEY_NAME, displayName);
        } else {
          window.localStorage.removeItem(KEY_NAME);
        }
      }
    );
  }

  @computed get userId() {
    return this.currentUser._id;
  }

  @action forgetUser() {
    this.currentUser = undefined;
    this.displayName = undefined;
  }

  @action async loginWithDisplayName(displayName) {
    this.isLoading = true;
    try {
      const response = await axios.request({
        method: 'get',
        params: { displayName },
        ...axiosConfig
      });
      this.currentUser = response.data.data.user;
      this.displayName = this.currentUser.displayName;
    } catch (err) {
      console.log(err);
      this.forgetUser();
    } finally {
      this.isLoading = false;
    }
  }
}

export default new UserStore();
