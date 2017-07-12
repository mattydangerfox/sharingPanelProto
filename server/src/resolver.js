const panels = [{
  id: '1',
  title: 'color trend since 2012',
}, {
  id: '2',
  title: 'fruit trend since 2013',
}];

export const resolvers = {
  Query: {
    panels: () => panels
  },
};