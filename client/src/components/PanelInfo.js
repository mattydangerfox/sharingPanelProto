import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import {
  CardBlock,
  CardTitle,
  CardText,
  CardFooter,
  Button,
  Input,
} from 'reactstrap';
import PanelResult from './PanelResult';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class PanelInfo extends Component {
  state = {
    editing: false
  };

  _handleOnClickEdit = (e) => {
    this.setState({editing: true});
  };

  _handleKeyDownOnInput = (e) => {
    if(e.keyCode === ESC_KEY_CODE) {
      this.setState({editing: false});
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this.props.mutate({
        variables: {
          input: {
            panelQueryID: this.props.panel.panelQuery.id,
            esQuery: { query: e.target.value }
          }
        }
      });
      this.setState({editing: false});
    }
  };

  render() {
    const query = this.props.panel.panelQuery.esQuery.query;
    const panel = this.props.panel;
    const isOwnerOfPanelQuery = panel.ownerID === panel.panelQuery.ownerID;
    let queryPart = <CardText>query: {this.props.panel.panelQuery.esQuery.query}
                      <Button
                        size="sm"
                        disabled={!isOwnerOfPanelQuery}
                        onClick={this._handleOnClickEdit}>edit
                      </Button>
                    </CardText>;
    if (this.state.editing) {
      const input = <Input
                      placeholder={query}
                      onKeyDown={this._handleKeyDownOnInput} />;
      queryPart = <CardText>query: {input}</CardText>;
    }

    return (
      <div>
        <CardBlock>
          <CardTitle>title will be here.</CardTitle>
          <PanelResult panel={panel} />
          {queryPart}
          <CardText>
            ownerID: {this.props.panel.ownerID}<br/>
            <small className="text-muted">sharedWith: {this.props.panel.panelQuery.sharedWith}</small>
          </CardText>
        </CardBlock>
        <CardFooter>
          <Button color="danger" size="sm">remove</Button>
        </CardFooter>
      </div>
    );
  }
}

export const editPanelQueryMutation = gql`
  mutation EditPanelQuery($input: EditPanelQueryInput!) {
    editPanelQuery(input: $input) {
      updatedPanels {
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

export default graphql(editPanelQueryMutation)(PanelInfo);