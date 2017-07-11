import React, { Component } from 'react';
import Panel from './Panel';

class PanelList extends Component {
  render() {
    return (
      <ul>{this.props.panels.map(p => <Panel key={p.id} panel={p}/>)}</ul>
    );
  }
}

export default PanelList;
