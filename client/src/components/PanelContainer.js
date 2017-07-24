import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import { Card } from 'reactstrap';
import PanelResult from './PanelResult';
import PanelInfo from './PanelInfo';

class PanelContainer extends Component {
  render() {
    const { data: { loading, error, panel } } = this.props;
    if (loading) {
      return <Card>{'loading...'}</Card>;
    }

    if (error) {
      return <Card>{error}</Card>;
    }

    return (
      <Card className="Panel">
        <PanelResult panel={panel.panel} />
        <PanelInfo panel={panel.panel}/>
      </Card>
    );
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
}))(PanelContainer);
