import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import PanelList from './PanelList';
import PanelInput from './PanelInput';

class DashBoard extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: panelUpdatedSubscription,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData || !subscriptionData.panelUpdated) {
          return prev;
        }

        const updatedPanel = subscriptionData.panelUpdated;
        const index = prev.panels.findIndex(p => p.id === updatedPanel.id);
        if (index === -1) {
          return prev;
        }
        // TODO: make it pure function style
        prev.panels[index] = updatedPanel;
        return prev
      }
    })
  }

  render() {
    const { data: {loading, error, panels } } = this.props;
    if (loading) {
      return <h1>loading...</h1>
    }
    if (error) {
      return <h1>Error: {error.message}</h1>
    }
    return (
      <div className="Dashboard">
        <h2>Dashboard</h2>
        <div>input: <PanelInput/></div>
        <PanelList panels={panels}/>
      </div>
    );
  }
}


export const panelsQuery = gql`
  query PanelsQuery {
      panels {
          id
          title
      }
  }
`;

const panelUpdatedSubscription = gql`
  subscription PanelUpdated {
      panelUpdated {
          id
          title
      }
  }
`;

export default(graphql(panelsQuery))(DashBoard);
