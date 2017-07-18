import db, { tabelNames } from './db'

test('db has three tables.', () => {
  expect(Array.from(db.keys())).toEqual(tabelNames);
});
