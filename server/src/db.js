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

  createPanelQuery = ({ ownerID, query }) => {
    this.counter.panelQueryCounter =+ 1;
    const newPanelQuery = {
      ownerID,
      id: this.counter.panelQueryCounter.toString(),
      sharedWith: [],
      esQuery: {
        query
      }
    };
    this.db.get('panelQuery').set(this.counter.panelQueryCounter.toString(), newPanelQuery);
    return newPanelQuery;
  };

  _createPanelContainer = ({ ownerID }) => {
    this.counter.panelCounter += 1;
    return {
      id: this.counter.panelCounter.toString(),
      ownerID,
    };
  };

  _createPanelShape = (shape = {height: 500, width: 600}) => {
    return shape
  };

  commit = (tableName, newObject) => {
    this.db.get(tableName).set(newObject.id, newObject);
  };

  createPanel = ({ ownerID, query }) => {
    const newPanel = this._createPanelContainer({ ownerID });
    newPanel.panelShape = this._createPanelShape();
    newPanel.panelQuery = this.createPanelQuery({ ownerID, query });
    this.commit('panel', newPanel);
    return newPanel;
  };

  getPanels = (ownerID = 'admin') => {
    if (ownerID === 'admin') {
      return Array.from(this.db.get('panel').values());
    }
    return Array.from(this.db.get('panel').values())
      .filter(panel => panel.ownerID === ownerID);
  };

  sharePanel = ({ ownerID, userID, panelID }) => {
    const panel = this.db.get('panel').get(panelID);

    // TODO(sanghee): Need to test Error in unittest
    if (!panel) {
      return new Error(`Invalid panelId ${panelID}`);
    }

    if (panel.ownerID !== ownerID || panel.panelQuery.ownerID !== ownerID) {
      return new Error(`${ownerID} is not the owner of panelId ${panelID} or it's panelQuery.`);
    }

    if (panel.panelQuery.sharedWith.includes(userID)) {
      return new Error(`panelID ${panelID} is already shared with userId ${userID}`);
    }

    // Create new panel for with new owner but original owner for panelQuery
    const newPanel = this._createPanelContainer({ ownerID: userID });
    newPanel.panelShape = this._createPanelShape();
    newPanel.panelQuery = panel.panelQuery;
    panel.panelQuery.sharedWith.push(userID);
    this.commit('panel', newPanel);
    return newPanel;
  };

  cancelSharedPanel = ({ ownerID, userID, panelID }) => {
    const panel = this.db.get('panel').get(panelID);
    if (!panel) {
      return new Error(`Invalid panelId ${panelID}`);
    }

    if (panel.ownerID !== ownerID || panel.panelQuery.ownerID !== ownerID) {
      return new Error(`${ownerID} is not the owner of panelId ${panelID} or it's panelQuery.`);
    }

    if (!panel.panelQuery.sharedWith.includes(userID)) {
      return new Error(`panelID ${panelID} is not shared with userId ${userID}`);
    }

    // Remove userId from panelQuery.sharedWith array and destroy the panel including the panelQuery.
    // TODO: need better way
    const [,willBeRemovedPanel] = Array.from(this.db.get('panel')).filter(p => {
      const [, panel] = p;
      return panel.ownerID === userID && panel.panelQuery.sharedWith.includes(userID);
    })[0];
    panel.panelQuery.sharedWith = panel.panelQuery.sharedWith.filter(id => id !== userID);
    this.db.get('panel').delete(willBeRemovedPanel.id);
    return willBeRemovedPanel;
  };
}

export default DB;
