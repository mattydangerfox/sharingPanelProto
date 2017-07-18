import db, {
  tabelNames,
  createPanelQuery,
  createPanel,
} from './db'

test('db has three tables.', () => {
  expect(Array.from(db.keys())).toEqual(tabelNames);
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
  expect(createPanelQuery({ owner, query })).toEqual(panelQuery);
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
  expect(createPanel({owner, query})).toEqual(panel);
});
