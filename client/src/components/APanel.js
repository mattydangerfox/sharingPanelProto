import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

class APanel extends Component {
  render() {
    const { data: { loading, error, search }} = this.props;
    if (loading) {
      return <li>loading...</li>
    }

    if (error) {
      return <li>Error: {error.message}</li>
    }

    return (
      <li>{search.panelData.series[0].data.toString()}</li>
    )
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
  options: (props) => ({
    variables: { input: { query: props.query }}
  })
}))(APanel);