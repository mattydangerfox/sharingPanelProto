import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

class APanel extends Component {
  render() {
    const { data: { loading, error, search }, panel } = this.props;
    let text = `panel.id: ${panel.id}, query: ${panel.panelQuery.esQuery.query} - `;
    if (loading) {
      text += 'loading...';
      return <li>{text}</li>;
    }

    if (error) {
      text += `Error: ${error.message} loading...`;
      return <li>{text}</li>;
    }

    text += `Result: ${search.panelData.series[0].data.toString()}`;
    return <li>{text}</li>;
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

export default(graphql(searchQuery, {
  options: ({ panel }) => ({
    variables: { input: { query: panel.panelQuery.esQuery.query }}
  })
}))(APanel);