import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import APanel from './APanel';

class DashBoard extends Component {

  render() {
    const { data: {loading, error, panels } } = this.props;
    if (loading) {
      return <h1>loading...</h1>
    }

    if (error) {
      return <h1>Error: {error.message}</h1>
    }

    const list = panels.panels.map(panel => {
      return <APanel key={panel.id} panel={panel} />
    });
    return (
      <div className="Dashboard">
        <h2>Dashboard</h2>
        <ol>
          {list}
        </ol>
      </div>
    );
  }
}

export const panelsQuery = gql`    
  query GetPanels($input: PanelsInput!){
    panels(input: $input) {
      panels {
        id
        ownerID
        panelQuery {
          id
          ownerID
          sharedWith
          esQuery {
            query
          }
        }
      }
    }
  }
`;

export default(graphql(panelsQuery, {
  options: (props) => ({
    variables: { input: { userId: props.userId } },
  })
}))(DashBoard);
