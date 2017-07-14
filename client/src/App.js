import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import './App.css';
import ResultTab from './components/ResultTab';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);
const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
  reconnect: true
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
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
          <ResultTab/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
