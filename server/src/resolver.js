import DB from './db';
import { getPanelData } from './helpers';

// init DB
const db = new DB();

// load sample data
const owner1 = {id: '1'};
const owner2 = {id: '2'};
const query1 = 'Summer trend 2016';
const query2 = 'Summer trend 2015';

db.createPanel({owner: owner1, query: query1});
db.createPanel({owner: owner2, query: query2});

export const resolvers = {
  Query: {
    panels: ( object, { input: { userId }} ) => {
      return {
        panels: db.getPanels(userId)
      };
    },
    search: ( object, { input: { query }} ) => {
      return {
        panelData: getPanelData(query)
      };
    }
  },
  Mutation: {
    sharePanel: ( object, {input: { ownerID, shareWith, panelID } } ) => {
      return {
        sharedPanel: db.sharePanel({ownerID, userID: shareWith, panelID})
      };
    }
  }
};
