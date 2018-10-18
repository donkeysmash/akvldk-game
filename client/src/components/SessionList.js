import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateSession from './CreateSession';
import SessionItem from './SessionItem';
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

    const items = Object.keys(sessions).map((k, i) => {
      return <SessionItem key={i} session={sessions[k]} />
    });
    return (
      <div className={rootCx}>
        <div className={itemsCx}>
          {items}
        </div>
        <CreateSession />
      </div>
    );
  }
}

const rootCx = css({
  marginTop: '1rem'
});
const itemsCx = css({
});

export default SessionList;