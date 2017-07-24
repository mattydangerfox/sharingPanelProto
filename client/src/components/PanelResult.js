import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import ReactHighcharts from 'react-highcharts';

class PanelResult extends Component {
  render() {
    const { data: { loading, error, search } } = this.props;
    if (loading) {
      return <div className="highcharts-container-box">{'loading...'}</div>;
    }

    if (error) {
      return <div>{`Error: ${error}`}</div>;
    }

    return <ReactHighcharts config={search.panelData}/>
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
