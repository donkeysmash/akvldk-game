import axios from 'axios';
import { observable, action, reaction } from 'mobx';
import config from '../../config';

const axiosConfig = {
  baseURL: config.serverUri,
  url: '/session',
};

class SessionStore {
  @observable sessions = [];
  @observable isLoading = false;

  @action async getSessions() {
    this.isLoading = true;
    try {
      const response = await axios.request({
        method: 'get',
        ...axiosConfig
      });
      this.sessions = response.data.data.sessions;
    } catch (err) {
      console.log(err);
      this.forgetUser();
    } finally {
      this.isLoading = false;
    }
  }

}

export default new SessionStore();
