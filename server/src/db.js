const db = new Map();
const tabelNames = ['panel', 'panelShape', 'panelQuery'];

tabelNames.map(table => db.set(table, new Map()));

export default db;
export {tabelNames};
