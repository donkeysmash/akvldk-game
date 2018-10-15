import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateSession from './CreateSession';
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

    const list = Object.keys(sessions).map((k, i) => {
      return (<div key={i}><Link to={`/sessions/${sessions[k]._id}`}>{sessions[k].name}</Link></div>)
    });
    return (
      <div>
        {list}
        <CreateSession />
      </div>
    );
  }
}

export default SessionList;