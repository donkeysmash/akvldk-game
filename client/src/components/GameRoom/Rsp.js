import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';


@inject('gameStore')
@observer
class Rsp extends Component {
  render() {
    return (
      <div>
        Wel come to rock scissors paper
      </div>
    )
  }
}

export default Rsp;
