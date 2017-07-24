import React, { Component } from 'react';
import PanelContainer from './PanelContainer';

export default class PanelList extends Component {
  render() {
    const list = this.props.panels.panels.map(panel => {
      return <PanelContainer key={panel.id} panel={panel} />
    });
    return <div>{list}</div>;
  }
}
