import React, { Component } from 'react';

import nameStore from '../store/name';

class SessionView extends Component {
  render() {
    const myname = nameStore.getName();
    debugger;
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

export default SessionView;