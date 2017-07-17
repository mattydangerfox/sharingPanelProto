import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver';

const typeDefs = `
type User {
  id: ID!
}

type PanelShape {
  height: Int!
  width: Int!
}

type PanelQuery {
  id: ID!
  owner: User!
  title: String!
  sharedWith: [User]
  esQuery: ESQuery!
}

type ESQuery {
  query: String!
}

type Panel {
  id: ID!
  owner: User!
  panelShape: PanelShape!
  panelQuery: PanelQuery
}

type Query {
  panels(input: PanelsInput!): PanelsPayload
}

input PanelsInput {
  userId: ID!
}

type PanelsPayload {
  panels: [Panel]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
