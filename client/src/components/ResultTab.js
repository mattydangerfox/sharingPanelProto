import React, { Component } from 'react';
import DashBoard from './DashBoard';

const ENTER_KEY_CODE = 13;

export default class ResultTab extends Component {
  state = {
    userId: "",
    userIdInput: ""
  };

  _handleOnChange = (e) => {
    this.setState({userInput: e.target.value})
  };

  _handleOnKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.setState({userId: e.target.value, userIdInput: ''});
    }
  };

  render() {
    const input = <input
      onChange={this._handleOnChange}
      onKeyDown={this._handleOnKeyDown}
    />;
    if (this.state.userId === "") {
      return <div>Input your user id: {input} ('admin' can see all the panels)</div>
    }
    return (
      <div>
        current user id: {this.state.userId}
        <DashBoard userId={this.state.userId}/>
      </div>
    )
  }
}
