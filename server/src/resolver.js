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
    },
    removePanel: (root, {id}) => {
      const index = panels.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Panel id ${id} does not exist`);
      }
      const removedItem = panels.splice(index, 1);
      return removedItem[0]
    }
  }
};