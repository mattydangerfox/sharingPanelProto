import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { panelsQuery } from './DashBoard';

class Panel extends Component {
  _handleOnClick = (e) => {
    this.props.mutate({
      variables: {
        id: this.props.panel.id
      },
      update: (store, { data: { removePanel } }) => {
        const data = store.readQuery({
          query: panelsQuery,
        });
        const index = data.panels.findIndex(p => p.id === this.props.panel.id);
        if (index !== -1) {
          data.panels.splice(index, 1);
        }
        store.writeQuery({
          query: panelsQuery,
          data
        });
      }
    })
  };

  render() {
    const {id, title} = this.props.panel;
    return (
      <li>id: {id}, title: {title} <button type="button" onClick={this._handleOnClick}>remove</button></li>
    );
  }
}

const removePanelMutation = gql`
  mutation removePanel($id: ID!) {
      removePanel(id: $id) {
          id
      }
  }
`;

const PanelWithMutation = graphql(removePanelMutation)(Panel);
export default PanelWithMutation;
