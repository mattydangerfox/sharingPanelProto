import DB from './db';
import { getPanelData } from './helpers';

// init DB
const db = new DB();

// load sample data
const ownerID1 = '1';
const ownerID2 = '2';
const query1 = 'Summer trend 2016';
const query2 = 'Summer trend 2015';

db.createPanel({ownerID: ownerID1, query: query1});
db.createPanel({ownerID: ownerID2, query: query2});

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
    },
    cancelSharedPanel: ( object, {input: { ownerID, shareWith, panelID } } ) => {
      return {
        canceledSharedPanel: db.cancelSharedPanel({ownerID, userID: shareWith, panelID})
      }
    },
    createPanel: ( object, { input: { ownerID, query } } ) => {
      return {
        createdPanel: db.createPanel( { ownerID, query } )
      }
    },
    removePanel: ( object, { input: { panelID } } ) => {
      return {
        removedPanel: db.removePanel({ panelID })
      }
    }
  }
};
