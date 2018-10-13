import axios from 'axios';
import { observable, action, computed } from 'mobx';
import config from '../../config';
import userStore from './userStore';

const axiosConfig = {
  baseURL: config.serverUri,
  url: '/session',
};

class SessionStore {
  @observable currentSessionId;
  @observable sessions = [];
  @observable isLoading = false;
  @observable isCreating = false;

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
      userStore.forgetUser();
    } finally {
      this.isLoading = false;
    }
  }

  @action async createSession(name, hostId) {
    this.isCreating = true;
    try {
      const response = await axios.request({
        method: 'post',
        data: { name, hostId },
        ...axiosConfig
      });
      this.sessions.push(response.data.data.session);
    } catch (err) {
      console.log(err);
    } finally {
      this.isCreating = false;
    }
  }

  @action setCurrentSessionId(id) {
    this.currentSessionId = id;
  }

  @computed get currentSession() {
    return this.sessions.find(session => session._id === this.currentSessionId);
  }

}

export default new SessionStore();
