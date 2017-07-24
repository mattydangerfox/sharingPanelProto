import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';



class PanelResult extends Component {
  render() {
    const { data: { loading, error, search } } = this.props;
    if (loading) {
      return <span>{'loading...'}</span>;
    }

    if (error) {
      return <span>{`Error: ${error}`}</span>;
    }

    const text = `Result: ${search.panelData.series[0].data.toString()}`;
    return <span>{text}</span>;
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
  options: ({panel}) => ({
    variables: {input: {query: panel.panelQuery.esQuery.query}}
  })
}))(PanelResult);
