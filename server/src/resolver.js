const panels = [{
  id: '1',
  title: 'color trend since 2012',
}, {
  id: '2',
  title: 'fruit trend since 2013',
}];

let nextId = 3;

export const resolvers = {
  Query: {
    panels: () => panels
  },
  Mutation: {
    addPanel: (root, args) => {
      const newPanel = {id: String(nextId++), title: args.title};
      panels.push(newPanel);
      return newPanel;
    }
  }
};