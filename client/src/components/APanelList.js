import React, { Component } from 'react';
import APanelContainer from './APanelContainer';

export default class APanelList extends Component {
  render() {
    const list = this.props.panels.panels.map(panel => {
      return <APanelContainer key={panel.id} panel={panel} />
    });
    return (
      <ol>{list}</ol>
    )
  }
}
