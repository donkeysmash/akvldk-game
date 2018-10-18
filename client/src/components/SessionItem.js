import React, { Component } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

class SessionItem extends Component {
  render() {
    const { session } = this.props;
    return (
      <Link className={rootCx} to={`/sessions/${session._id}`}>
        <div className={nameCx}>{session.name}</div>
        <div className={gameTypeCx}>{session.gameType}</div>
      </Link>
    );
  }
}

const rootCx = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.3rem',
  padding: '0.2rem',
  border: 'brown solid 1px',
  borderRadius: '1rem'
});
const nameCx = css({ marginLeft: '0.4rem' });
const gameTypeCx = css({ marginRight: '0.4rem' });

export default SessionItem;