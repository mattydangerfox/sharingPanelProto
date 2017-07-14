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
    });
    this.props.data.subscribeToMore({
      document: panelRemovedSubscription,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) {
          return prev;
        }

        const panelRemoved = subscriptionData.data.panelRemoved;
        const index = prev.panels.findIndex(p => p.id === panelRemoved.id);
        if (index === -1) {
          return prev;
        }
        // TODO: don't know how to remove item from store correctly
        let panels = [...prev.panels];
        panels.splice(index, 1);
        return Object.assign({}, prev, {
            panels: panels
        });
      }
    });
    this.props.data.subscribeToMore({
      document: panelAddedSubscription,
      variables: {
        userId: this.props.userId
      },
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) {
          return prev;
        }

        const panelAdded = subscriptionData.data.panelAdded;
        if (!prev.panels.find((panel) => panel.id === panelAdded.id)) {
          return Object.assign({}, prev, {
            panels: [...prev.panels, panelAdded]
          });
        } else {
          return prev;
        }
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
        <div>input: <PanelInput {...this.props}/></div>
        <PanelList panels={panels}/>
      </div>
    );
  }
}

export const panelsQuery = gql`
  query PanelsQuery($userId: ID!) {
      panels(userId: $userId) {
          id
          owner
          title
          panelData {
              title {
                  text
              }
              xAxis {
                  categories
              }
              series {
                  data
              }
          }
      }
  }
`;

const panelUpdatedSubscription = gql`
  subscription PanelUpdated {
      panelUpdated {
          id
          owner
          title
          panelData {
              title {
                  text
              }
              xAxis {
                  categories
              }
              series {
                  data
              }
          }
      }
  }
`;

const panelRemovedSubscription = gql`
    subscription PanelRemoved {
        panelRemoved {
            id
        }
    }
`;

const panelAddedSubscription = gql`
    subscription PanelAdded($userId: ID!) {
        panelAdded(userId: $userId) {
            id
            title
            owner
        }
    }
`;

export default(graphql(panelsQuery, {
  options: (props) => ({
    variables: { userId: props.userId },
  })
}))(DashBoard);
