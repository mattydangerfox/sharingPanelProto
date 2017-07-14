import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { panelsQuery } from './DashBoard';

const ENTER_KEY = 13;

class PanelInput extends Component {
  _handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEY) {
      this.props.mutate({
        variables: {
          input: {
            owner: this.props.userId,
            title: e.target.value
          }
        },
        optimisticResponse: {
          addPanel: {
            title: e.target.value,
            owner: this.props.userId,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Panel',
          },
        },
        update: (store, { data: { addPanel } }) => {
          const data = store.readQuery({
            query: panelsQuery,
            variables: { userId: this.props.userId }
          });
          // don't double add the panel
          if (!data.panels.find((panel) => panel.id === addPanel.id)) {
            // Add our Message from the mutation to the end.
            data.panels.push(addPanel);
          }
          store.writeQuery({
            query: panelsQuery,
            variables: { userId: this.props.userId },
            data
          });
        },
      });
      e.target.value = '';
    }
  };

  render() {
    return (
      <input onKeyUp={this._handleKeyUp} type="text" placeholder="title"/>
    );
  }
}

const addPanelMutation = gql`
    mutation addPanel($input: AddPanelInput!) {
        addPanel(input: $input) {
            id
            owner
            title
        }
    }
`;

const PanelInputWithMutation = graphql(addPanelMutation)(PanelInput);
export default PanelInputWithMutation;