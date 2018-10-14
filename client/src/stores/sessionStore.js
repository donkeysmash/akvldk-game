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
  @observable sessions = {};
  @observable isLoading = false;
  @observable isCreating = false;

  @action async getSessions() {
    this.isLoading = true;
    try {
      const response = await axios.request({
        method: 'get',
        ...axiosConfig
      });
      const resSessions = response.data.data.sessions;
      this.sessions = resSessions.reduce((acc, v) => {
        acc[v._id] = v;
        return acc;
      }, {});
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
      const resSession = response.data.data.session;
      this.sessions[resSession._id] = resSession;
    } catch (err) {
      console.log(err);
    } finally {
      this.isCreating = false;
    }
  }

  @action async getSession(sessionId) {
    this.isLoading = true;
    try {
      const response = await axios.request({
        ...axiosConfig,
        method: 'get',
        url: `/session/${sessionId}`
      });
      const resSession = response.data.data.session;
      this.sessions[resSession._id] = resSession;
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  @action setCurrentSessionId(id) {
    this.currentSessionId = id;
  }

  @computed get currentSession() {
    return this.sessions[this.currentSessionId];
  }

}

export default new SessionStore();
