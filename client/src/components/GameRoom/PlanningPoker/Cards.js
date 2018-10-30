import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('ppStore')
@observer
class Cards extends Component {
  onClickHandler = e => {
    const voteValue = Number(e.target.innerText);
    this.props.ppStore.setVoteValue(voteValue);
  }

  render() {
    const { voteValue } = this.props.ppStore;
    return (
      <div>
        {voteValue && <div>{voteValue}</div>}
        <div onClick={this.onClickHandler}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>5</div>
          <div>8</div>
          <div>13</div>
          <div>20</div>
        </div>
      </div>
    );
  }
}

export default Cards;