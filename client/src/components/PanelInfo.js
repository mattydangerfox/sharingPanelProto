import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

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
    const {id, panelQuery: { esQuery } } = this.props.panel;
    if (this.state.editing) {
      const input = <input
        placeholder={esQuery.query}
        onKeyDown={this._handleKeyDownOnInput} />;
      return <span>{input}</span>;
    }

    const button = <button type="button"onClick={this._handleOnClickEdit}>edit query</button>;
    return (
      <span>id: {id}, query: {esQuery.query} {button}</span>
    )
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