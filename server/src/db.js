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

  _createPanelContainer = ({ owner }) => {
    this.counter.panelCounter += 1;
    return {
      owner,
      id: this.counter.panelCounter,
    };
  };

  _createPanelShape = (shape = {height: 500, width: 600}) => {
    return shape
  };

  commit = (tableName, newObject) => {
    this.db.get(tableName).set(newObject.id, newObject);
  };

  createPanel = ({ owner, query }) => {
    const newPanel = this._createPanelContainer({ owner });
    newPanel.panelShape = this._createPanelShape();
    newPanel.panelQuery = this.createPanelQuery({ owner, query });
    this.commit('panel', newPanel);
    return newPanel;
  };

  getPanels = (ownerID) => {
    return Array.from(this.db.get('panel').values())
      .filter(o => o.owner.id === ownerID);
  };

  sharePanel = ({ ownerID, userID, panelID }) => {
    const panel = this.db.get('panel').get(panelID);
    if (!panel) {
      new Error(`Invalid panelId ${panelID}`);
    }

    if (panel.owner.id !== ownerID || panel.panelQuery.owner.id !== ownerID) {
      new Error(`${ownerID} is not the owner of panelId ${panelID} or it's panelQuery.`);
    }

    if (panel.panelQuery.sharedWith.includes(userID)) {
      new Error(`panelID ${panelID} is already shared with userId ${userID}`);
    }

    // Create new panel for with new owner but original owner for panelQuery
    const newPanel = this._createPanelContainer({ owner: { id: userID } });
    newPanel.panelShape = this._createPanelShape();
    newPanel.panelQuery = panel.panelQuery;
    panel.panelQuery.sharedWith.push(userID);
    this.commit('panel', newPanel);
    return newPanel;
  }
}

export default DB;
