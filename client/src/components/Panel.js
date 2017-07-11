import React, { Component } from 'react';

class Panel extends Component {
  render() {
    const {id, title} = this.props.panel;
    return (
      <li>id: {id}, title: {title}</li>
    );
  }
}

export default Panel;
