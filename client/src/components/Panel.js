import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import ReactHighcharts from 'react-highcharts';
import { panelsQuery } from './DashBoard';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class Panel extends Component {
  state = {
    editing: false
  };

  _handleOnClickRemove = (e) => {
    this.props.removePanelMutation({
      variables: {
        id: this.props.panel.id
      },
      optimisticResponse: {
        removePanel: {
          id: this.props.panel.id,
          __typename: 'Panel',
        },
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

  _handleOnClickEdit = (e) => {
    this.setState({editing: true});
  };

  _handleKeyDownOnInput = (e) => {
    if(e.keyCode === ESC_KEY_CODE) {
      this.setState({editing: false});
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this.props.updatePanelMutation({
        variables: {
          input: {
            id: this.props.panel.id, title: e.target.value}
        },
        update: (store, { data: { updatePanel } }) => {
          const data = store.readQuery({
            query: panelsQuery,
          });
          const index = data.panels.findIndex(p => p.id === this.props.panel.id);
          data.panels[index] = updatePanel;
          store.writeQuery({
            query: panelsQuery,
            data
          });
        }
      });
      this.setState({editing: false});
    }
  };

  render() {
    const {id, owner, title} = this.props.panel;
    const config = {
      title: {
        text: title
      },
      subtitle: {
        text: `owner id: ${owner}, panel id: ${id}`
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }]
    };
    if (this.state.editing) {
      return (
        <div>
          <input placeholder={title} onKeyDown={this._handleKeyDownOnInput}/>
        </div>
      );
    }

    return (
      <div className="Panel">
        <ReactHighcharts config = {config}/>
        <button type="button" onClick={this._handleOnClickEdit}>edit</button>
        <button type="button" onClick={this._handleOnClickRemove}>remove</button>
      </div>
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

const updatePanelMutation = gql`
    mutation updatePanel($input: UpdatePanelInput!) {
        updatePanel(input: $input) {
            id
            title
        }
    }
`;

const PanelWithMutation = compose(
  graphql(removePanelMutation,{ name: 'removePanelMutation' }),
  graphql(updatePanelMutation, { name: 'updatePanelMutation' }),
)(Panel);
export default PanelWithMutation;
