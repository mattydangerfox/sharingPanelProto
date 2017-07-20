import DB from './db';

const db = new DB();

beforeEach(() => {
  db.reset();
});

test('db has three tables.', () => {
  expect(Array.from(db.tableNames)).toEqual(db.tableNames);
});

test('creating panelQuery returns panelQuery object.', () => {
  const ownerID = '1';
  const query = 'Summer Trend 2016';
  const panelQuery = {
    ownerID,
    id: '1',
    sharedWith: [],
    esQuery: {
      query
    }
  };
  expect(db.createPanelQuery({ ownerID, query })).toEqual(panelQuery);
});

test('creating panel returns panel object.', () => {
  const ownerID = '1';
  const query = 'Summer Trend 2016';
  const panel = {
    ownerID,
    id: '1',
    panelShape: {
      height: 500,
      width: 600,
    },
    panelQuery: {
      ownerID,
      id: '1',
      sharedWith: [],
      esQuery: {
        query
      }
    }
  };
  expect(db.createPanel({ownerID, query})).toEqual(panel);
});

test('reset DB', () => {
  const ownerID = '1';
  const query = 'Summer Trend 2015';
  db.createPanel({ownerID, query});
  expect(db.getPanels(ownerID).length).toBe(1);
  db.reset();
  expect(db.getPanels(ownerID).length).toBe(0);
});


test('get all the panels related to given owner', () => {
  const ownerID1 = '1';
  const ownerID2 = '2';
  const query = 'Summer Trend 2015';
  db.createPanel({ownerID: ownerID1, query});
  db.createPanel({ownerID: ownerID2, query});
  expect(db.getPanels(ownerID1).length).toBe(1);
  expect(db.getPanels(ownerID2).length).toBe(1);
});

test('admin gets every panels.', () => {
  const ownerID1 = '1';
  const ownerID2 = '2';
  const query = 'Summer Trend 2015';
  db.createPanel({ownerID: ownerID1, query});
  db.createPanel({ownerID: ownerID2, query});
  expect(db.getPanels(ownerID1).length).toBe(1);
  expect(db.getPanels(ownerID2).length).toBe(1);
  expect(db.getPanels('admin').length).toBe(2);
});

test('share panel to another user.', () => {
  const ownerID = '1';
  const panelID = '1';
  const userID = '2';
  const query = 'Summer Trend 2015';
  db.createPanel({ownerID, query});
  expect(db.getPanels(ownerID).length).toBe(1);
  expect(db.getPanels(userID).length).toBe(0);
  db.sharePanel({
    ownerID,
    panelID,
    userID,
  });
  expect(db.getPanels(ownerID).length).toBe(1);
  expect(db.getPanels(userID).length).toBe(1);
});

test('cancel sharedPanel.', () => {
  const ownerID = '1';
  const panelID = '1';
  const userID = '2';
  const query = 'Summer Trend 2015';
  db.createPanel({ownerID, query});
  expect(db.getPanels(ownerID).length).toBe(1);
  db.sharePanel({
    ownerID,
    panelID,
    userID,
  });
  expect(db.getPanels(ownerID).length).toBe(1);
  expect(db.getPanels(userID).length).toBe(1);
  db.cancelSharedPanel({
    ownerID,
    panelID,
    userID,
  });
  expect(db.getPanels(ownerID).length).toBe(1);
  expect(db.getPanels(userID).length).toBe(0);
});