import React, { Component } from 'react';
import {
  gql,
  graphql,
  compose,
} from 'react-apollo';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class APanel extends Component {
  state = {
    editing: false
  };

  _handleOnClickEdit = (e) => {
    this.setState({editing: true});
  };

  // TODO
  _handleKeyDownOnInput = (e) => {
    if(e.keyCode === ESC_KEY_CODE) {
      this.setState({editing: false});
    } else if (e.keyCode === ENTER_KEY_CODE) {
      /*
      this.props.updatePanelMutation({
        variables: {
          input: {
            id: this.props.panel.id,
            title: e.target.value
          }
        },
        update: (store, { data: { updatePanel } }) => {
          const data = store.readQuery({
            query: panelsQuery,
            variables: { userId: this.props.userId }
          });
          const index = data.panels.findIndex(p => p.id === this.props.panel.id);
          data.panels[index] = updatePanel;
          store.writeQuery({
            query: panelsQuery,
            data
          });
        }
      });
      */
      this.setState({editing: false});
    }
  };

  render() {
    const { data: { loading, error, search }, panel } = this.props;
    const query = panel.panelQuery.esQuery.query;
    if (this.state.editing) {
      const input = <input
        placeholder={query}
        onKeyDown={this._handleKeyDownOnInput} />;
      return <li>{input}</li>;
    }

    let text = `panel.id: ${panel.id}, query: ${query} - `;
    if (loading) {
      text += 'loading...';
      return <li>{text}</li>;
    }

    if (error) {
      text += `Error: ${error.message} loading...`;
      return <li>{text}</li>;
    }

    text += `Result: ${search.panelData.series[0].data.toString()}`;
    return <li>{text}<button type="button" onClick={this._handleOnClickEdit}>edit query</button></li>;
  }
}

export const searchQuery = gql`
  query SearchQuery($input: SearchInput!) {
    search(input: $input) {
      panelData{
        xAxis {
          categories
        }
        series {
          data
        }
      }
    }
  }
`;

// FIXME
const updatePanelMutation = gql`
    mutation updatePanel($input: UpdatePanelInput!) {
        updatePanel(input: $input) {
            id
            owner
            title
            panelData {
                title {
                    text
                }
                xAxis {
                    categories
                }
                series {
                    data
                }
            }
        }
    }
`;

export default(compose(
  graphql(searchQuery, {
    options: ({panel}) => ({
      variables: {input: {query: panel.panelQuery.esQuery.query}}
    }),
  }),
  graphql(updatePanelMutation, { name: 'updatePanelMutation' }),
))(APanel);