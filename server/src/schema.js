import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver';

const typeDefs = `
type Panel {
  id: ID!
  title: String!
}

type Query {
  panels: [Panel]
}

type Mutation {
  addPanel(title: String!): Panel
  removePanel(id: ID!): Panel
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
