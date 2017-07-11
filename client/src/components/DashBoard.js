import React, { Component } from 'react';
import PanelList from './PanelList';
import PanelInput from './PanelInput';

class DashBoard extends Component {
  render() {
    const panels = [{id: 1, title: "competitors"}, {id: 2, title: "collaborators"}];
    return (
      <div className="Dashboard">
        <h2>Dashboard</h2>
        <div>input: <PanelInput/></div>
        <PanelList panels={panels}/>
      </div>
    );
  }
}

export default DashBoard;
