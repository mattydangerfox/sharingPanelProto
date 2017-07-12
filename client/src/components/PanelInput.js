import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { panelsQuery } from './DashBoard';

const ENTER_KEY = 13;

class PanelInput extends Component {
  _handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEY) {
      this.props.mutate({
        variables: {
          title: e.target.value
        },
        optimisticResponse: {
          addPanel: {
            title: e.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Panel',
          },
        },
        update: (store, { data: { addPanel } }) => {
          const data = store.readQuery({
            query: panelsQuery,
          });
          data.panels.push(addPanel);
          store.writeQuery({
            query: panelsQuery,
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
    mutation addPanel($title: String!) {
        addPanel(title: $title) {
            id
            title
        }
    }
`;

const PanelInputWithMutation = graphql(addPanelMutation)(PanelInput);
export default PanelInputWithMutation;