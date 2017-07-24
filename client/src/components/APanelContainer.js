import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import APanelResult from './APanelResult';
import APanelInfo from './APanelInfo';

class APanelContainer extends Component {
  render() {
    const { data: { loading, error, panel } } = this.props;
    if (loading) {
      return <li>{'loading...'}</li>;
    }

    if (error) {
      return <li>{error}</li>;
    }

    return <li><APanelInfo panel={panel.panel} /> :: <APanelResult panel={panel.panel} /></li>;
  }
}

export const panelQuery = gql`
    query GetPanel($input: PanelInput!) {
        panel(input: $input) {
            panel {
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

export default (graphql(panelQuery, {
  options: (props) => ({
    variables: { input: { panelID: props.panel.id}}
  })
}))(APanelContainer);
