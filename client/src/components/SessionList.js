import React, { Component } from 'react';
import { css } from 'emotion';
import axios from 'axios';
import config from '../../config';

class SessionList extends Component {
  state = {
    sessions: []
  }

  async componentDidMount() {
    const sessions = (await axios.get(`${config.serverUri}/session`)).data;
    this.setState({ sessions });
  }

  render() {
    const { sessions } = this.state;
    const list = sessions.map((session, i) => <div key={i}>{session.name}</div>);
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default SessionList;