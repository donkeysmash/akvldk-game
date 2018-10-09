import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const list = sessions.map((session, i) =>
      <Link key={i} to={`/sessions/${session._id}`}>{session.name}</Link>);
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default SessionList;