import React, { Component } from 'react';
import Panel from './Panel';

class PanelList extends Component {
  render() {
    return (
      <div>{this.props.panels.map(p => <Panel key={p.id} panel={p}/>)}</div>
    );
  }
}

export default PanelList;
