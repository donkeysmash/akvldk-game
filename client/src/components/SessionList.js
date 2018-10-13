import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { inject, observer } from 'mobx-react';

@inject('sessionStore')
@observer
class SessionList extends Component {
  componentDidMount() {
    this.props.sessionStore.getSessions();
  }

  render() {
    const { sessions } = this.props.sessionStore;
    if (!sessions.length) {
      return null;
    }
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