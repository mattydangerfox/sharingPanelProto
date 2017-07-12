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

input UpdatePanelInput {
  id: ID!
  title: String!
}

type Mutation {
  addPanel(title: String!): Panel
  removePanel(id: ID!): Panel
  updatePanel(input: UpdatePanelInput!): Panel
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
