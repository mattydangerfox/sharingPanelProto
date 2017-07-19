class DB {
  constructor() {
    this.init();
  }

  reset() {
    this.init();
  }

  init() {
    this.db = new Map();
    this.tableNames = ['panel', 'panelShape', 'panelQuery'];
    this.counter =  {
      panelCounter: 0,
      panelShapeCounter: 0,
      panelQueryCounter: 0,
    };
    this.tableNames.map(table => this.db.set(table, new Map()));
  }

  createPanelQuery = ({ owner, query }) => {
    this.counter.panelQueryCounter =+ 1;
    const newPanelQuery = {
      owner,
      id: this.counter.panelQueryCounter,
      sharedWith: [],
      esQuery: {
        query
      }
    };
    this.db.get('panelQuery').set(this.counter.panelQueryCounter, newPanelQuery);
    return newPanelQuery;
  };

  createPanel = ({ owner, query }) => {
    this.counter.panelCounter += 1;
    const newPanel = {
      owner,
      id: this.counter.panelCounter,
      panelQuery: this.createPanelQuery({owner, query}),
      panelShape: {
        height: 500,
        width: 600,
      }
    };
    this.db.get('panel').set(this.counter.panelCounter, newPanel);
    return newPanel;
  };

  getPanels = ({ owner }) => {
    return Array.from(this.db.get('panel').values())
      .filter(o => o.owner.id === owner.id)
  }
}

export default DB;
