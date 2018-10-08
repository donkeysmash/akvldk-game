import React, { Component } from 'react';
import { css } from 'emotion';
import { hot } from 'react-hot-loader';
import NameForm from './components/NameForm';
import axios from 'axios';
import config from '../config';


class App extends Component {
  state = {
    sessions: []
  }

  async componentDidMount() {
    const sessions = (await axios.get(`${config.serverUri}/session`)).data;
    this.setState({ sessions });
  }

  render() {
    const { sessions } = this.state;
    const list = sessions.map(session => <div>{session.name}</div>);

    return (
      <div className={className}>
        {list}
        <NameForm />
      </div>
    );
  }
}

const className = css({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'
});

export default hot(module)(App);
