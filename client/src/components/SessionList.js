import React, { Component } from 'react';
import { css } from 'emotion';

class SessionList extends Component {
  state = {
    sessions: []
  }

  async componentDidMount() {
    const sessions = (await axios.get(`${config.serverUri}/session`)).data;
    this.setState({ sessions });
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default SessionList;