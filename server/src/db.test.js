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
  expect(db.getPanels({owner: owner1}).length).toBe(1);
  expect(db.getPanels({owner: owner2}).length).toBe(1);
});