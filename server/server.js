import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './src/schema';

const PORT = 4000;
const server = express();

server.use('*', cors({ origin: 'http://localhost:3000' }));
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
server.listen(PORT, () => {
  console.log(`GraphQL server is now running on http://localhost:${PORT}!`);
});
