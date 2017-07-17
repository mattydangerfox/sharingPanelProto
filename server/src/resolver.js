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
      return {
        panels: panels.filter(panel => panel.owner.id === userId)
      };
    }
  }
};
