import { getPanelData } from './helpers';

let panelCounter = 0;
let panelQueryCounter = 0;
const panels = [];

const user1 = {id: "1"};
const user2 = {id: "2"};
const defaultPanelShape = {height: 500, width: 600};

const panelQuery1 = {
  id: ++panelQueryCounter,
  owner: user1,
  sharedWith: [user2],
  esQuery: {query: 'Summer trend 2016'}
};

const panelA = {
  id: ++panelCounter,
  owner: user1,
  panelShape: defaultPanelShape,
  panelQuery: panelQuery1
};

const panelB = {
  id: ++panelCounter,
  owner: user2,
  panelShape: defaultPanelShape,
  panelQuery: panelQuery1
};

panels.push(panelA);
panels.push(panelB);

export const resolvers = {
  Query: {
    panels: ( object, { input: { userId }} ) => {
      if (userId === 'admin') {
        return {
          panels: panels
        };
      }

      return {
        panels: panels.filter(panel => panel.owner.id === userId)
      };
    },
    search: ( object, { input: { query }} ) => {
      return {
        panelData: getPanelData(query)
      }
    }
  },
  Mutation: {
    sharePanel: ( object, {input: { panelQueryId, ownerId, sharedWith }} ) => {
      const panelIndex = panels.findIndex(panel => panel.panelQuery.id.toString() === panelQueryId);
      const alreadyShared = panels[panelIndex].panelQuery.sharedWith.findIndex(sw => sw.id === sharedWith);

      if (panels[panelIndex].panelQuery.owner.id !== ownerId) {
        throw new Error('You are not the owner of the panelQuery.');
      }
      if (alreadyShared !== -1) {
        throw new Error(`PanelQuery ${panelQueryId} is already shared with user ${sharedWith}.`);
      }

      panels[panelIndex].panelQuery.sharedWith.push({id: sharedWith});
      const newPanel = {
        id: ++panelCounter,
        owner: {id: sharedWith},
        panelShape: defaultPanelShape,
        panelQuery: panels[panelIndex].panelQuery,
      };
      panels.push(newPanel);

      return {
        panelQuery: panels[panelIndex].panelQuery
      };
    }
  }
};
