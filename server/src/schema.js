import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver';

const typeDefs = `
type Title {
  text: String
}

type xAxis {
  categories: [String]
}

type SeriesData {
  data: [Int]
}

type PanelData {
  title: Title!
  xAxis: xAxis!
  series: [SeriesData]
}

type Panel {
  id: ID!
  owner: ID!
  title: String
  panelData: PanelData
}

type Query {
  panels(userId: ID!): [Panel]
}

input AddPanelInput {
  owner: ID!
  title: String!
}

input UpdatePanelInput {
  id: ID!
  title: String!
}

type Mutation {
  addPanel(input: AddPanelInput!): Panel
  removePanel(id: ID!): Panel
  updatePanel(input: UpdatePanelInput!): Panel
}

type Subscription {
  panelUpdated: Panel
  panelRemoved: Panel
  panelAdded(userId: ID!): Panel
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
