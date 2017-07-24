import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import {
  CardBlock,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

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
    if (this.state.editing) {
      const input = <input
        placeholder={query}
        onKeyDown={this._handleKeyDownOnInput} />;
      return (
        <div>
          <CardBlock>
            <CardTitle>{input}</CardTitle>
            <CardSubtitle>ownerID: {this.props.panel.ownerID}</CardSubtitle>
            <CardSubtitle>sharedWith: {this.props.panel.panelQuery.sharedWith}</CardSubtitle>
            <Button onClick={this._handleOnClickEdit}>edit query</Button>;
          </CardBlock>
        </div>
      );
    }

    return (
      <div>
        <CardBlock>
          <CardTitle>{query}</CardTitle>
          <CardSubtitle>ownerID: {this.props.panel.ownerID}</CardSubtitle>
          <CardSubtitle>sharedWith: {this.props.panel.panelQuery.sharedWith}</CardSubtitle>
          <Button onClick={this._handleOnClickEdit}>edit query</Button>
        </CardBlock>
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