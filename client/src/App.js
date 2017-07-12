import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';
import './App.css';
import DashBoard from './components/DashBoard';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface: networkInterface,
  customResolvers: {
    Query: {
      panel: (_, args) => toIdValue(dataIdFromObject({ __typename: 'Panel', id: args['id'] }))
    },
  },
  dataIdFromObject,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <DashBoard/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
