const db = new Map();
const tabelNames = ['panel', 'panelShape', 'panelQuery'];
const counter = {
  panelCounter: 0,
  panelShapeCounter: 0,
  panelQueryCounter: 0,
};

tabelNames.map(table => db.set(table, new Map()));

const createPanelQuery = ({ owner, query }) => {
  counter.panelQueryCounter =+ 1;
  const newPanelQuery = {
    owner,
    id: counter.panelQueryCounter,
    sharedWith: [],
    esQuery: {
      query
    }
  };
  db.get('panelQuery').set(counter.panelQueryCounter, newPanelQuery);
  return newPanelQuery;
};

const createPanel = ({ owner, query }) => {
  counter.panelCounter += 1;
  const newPanel = {
    owner,
    id: counter.panelCounter,
    panelQuery: createPanelQuery({owner, query}),
    panelShape: {
      height: 500,
      width: 600,
    }
  };
  db.get('panel').set(counter.panelCounter, newPanel);
  return newPanel;
};

export default db;
export { tabelNames, createPanelQuery, createPanel };
