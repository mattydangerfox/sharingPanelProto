import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver';

const typeDefs = `
type PanelShape {
  height: Int!
  width: Int!
}

type PanelQuery {
  id: ID!
  ownerID: ID!
  title: String!
  sharedWith: [ID]
  esQuery: ESQuery!
}

type ESQuery {
  query: String!
}

type Panel {
  id: ID!
  ownerID: ID!
  panelShape: PanelShape!
  panelQuery: PanelQuery
}

type Query {
  panels(input: PanelsInput!): PanelsPayload
  panel(input: PanelInput!): PanelPayload
  search(input: SearchInput!): SearchPayload
}

input PanelsInput {
  userId: ID!
}

type PanelsPayload {
  panels: [Panel]
}

input PanelInput{
  panelID: ID!
}

type PanelPayload {
  panel: Panel
}


input SearchInput {
  query: String!
}

type SearchPayload {
  panelData: PanelData!
}

type XAxis {
  categories: [String]
}

type Series {
  data: [Int]
}

type PanelData {
  xAxis: XAxis
  series: [Series]
}

type Mutation {
  sharePanel(input: SharePanelInput!): SharePanelPayload
  cancelSharedPanel(input: CancelSharedPanelInput!): CancelSharedPanelPayload
  createPanel(input: CreatePanelInput!): CreatePanelPayload
  removePanel(input: RemovePanelInput!): RemovePanelPayload
  editPanelQuery(input: EditPanelQueryInput!): EditPanelQueryPayload
}

input SharePanelInput {
  ownerID: ID!
  shareWith: ID!
  panelID: ID!
}

type SharePanelPayload {
  sharedPanel: Panel!
}

input CancelSharedPanelInput {
  ownerID: ID!
  shareWith: ID!
  panelID: ID!  
}

type CancelSharedPanelPayload {
  canceledSharedPanel: Panel!
}

input CreatePanelInput {
  ownerID: ID!
  query: String!
}

type CreatePanelPayload {
  createdPanel: Panel!
}

input RemovePanelInput {
  panelID: ID!
}

type RemovePanelPayload {
  removedPanel: Panel
}

input ESQueryInput {
  query: String!
}

input EditPanelQueryInput {
  panelQueryID: ID!
  esQuery: ESQueryInput!
}

type EditPanelQueryPayload {
  editedPanelQuery: PanelQuery!
  updatedPanels: [Panel]!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
