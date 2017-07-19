import DB from './db';

const db = new DB();

beforeEach(() => {
  db.reset();
});

test('db has three tables.', () => {
  expect(Array.from(db.tableNames)).toEqual(db.tableNames);
});

test('creating panelQuery returns panelQuery object.', () => {
  const owner = {
    id: 1
  };
  const query = 'Summer Trend 2016';
  const panelQuery = {
    owner,
    id: 1,
    sharedWith: [],
    esQuery: {
      query
    }
  };
  expect(db.createPanelQuery({ owner, query })).toEqual(panelQuery);
});

test('creating panel returns panel object.', () => {
  const owner = {
    id: 1
  };
  const query = 'Summer Trend 2016';
  const panel = {
    owner,
    id: 1,
    panelShape: {
      height: 500,
      width: 600,
    },
    panelQuery: {
      owner,
      id: 1,
      sharedWith: [],
      esQuery: {
        query
      }
    }
  };
  expect(db.createPanel({owner, query})).toEqual(panel);
});

test('reset DB', () => {
  const owner = { id: 1 };
  const query = 'Summer Trend 2015';
  db.createPanel({owner: owner, query});
  expect(db.getPanels(owner.id).length).toBe(1);
  db.reset();
  expect(db.getPanels(owner.id).length).toBe(0);
});


test('get all the panels related to given owner', () => {
  const owner1 = {
    id: 1
  };
  const owner2 = {
    id: 2
  };
  const query = 'Summer Trend 2015';
  db.createPanel({owner: owner1, query});
  db.createPanel({owner: owner2, query});
  expect(db.getPanels(owner1.id).length).toBe(1);
  expect(db.getPanels(owner2.id).length).toBe(1);
});

test('admin gets every panels.', () => {
  const owner1 = {
    id: 1
  };
  const owner2 = {
    id: 2
  };
  const query = 'Summer Trend 2015';
  db.createPanel({owner: owner1, query});
  db.createPanel({owner: owner2, query});
  expect(db.getPanels(owner1.id).length).toBe(1);
  expect(db.getPanels(owner2.id).length).toBe(1);
  expect(db.getPanels('admin').length).toBe(2);
});

test('share panel to another user.', () => {
  const owner1 = { id: 1 };
  const owner2 = { id: 2 };
  const query = 'Summer Trend 2015';
  const panel = db.createPanel({owner: owner1, query});
  expect(db.getPanels(owner1.id).length).toBe(1);
  db.sharePanel({
    ownerID: owner1.id,
    panelID: panel.id,
    userID: owner2.id
  });
  expect(db.getPanels(owner1.id).length).toBe(1);
  expect(db.getPanels(owner2.id).length).toBe(1);
});

test('cancel sharedPanel.', () => {
  const owner1 = { id: 1 };
  const owner2 = { id: 2 };
  const query = 'Summer Trend 2015';
  const panel = db.createPanel({owner: owner1, query});
  expect(db.getPanels(owner1.id).length).toBe(1);
  db.sharePanel({
    ownerID: owner1.id,
    panelID: panel.id,
    userID: owner2.id
  });
  expect(db.getPanels(owner1.id).length).toBe(1);
  expect(db.getPanels(owner2.id).length).toBe(1);
  db.cancelSharedPanel({
    ownerID: owner1.id,
    panelID: panel.id,
    userID: owner2.id
  });
  expect(db.getPanels(owner1.id).length).toBe(1);
  expect(db.getPanels(owner2.id).length).toBe(0);
});