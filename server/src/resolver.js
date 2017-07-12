import { PubSub, withFilter } from 'graphql-subscriptions';

const panels = [{
  id: '1',
  title: 'color trend since 2012',
}, {
  id: '2',
  title: 'fruit trend since 2013',
}];

let nextId = 3;
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    panels: () => panels
  },
  Mutation: {
    addPanel: (root, args) => {
      const newPanel = {id: String(nextId++), title: args.title};
      panels.push(newPanel);
      pubsub.publish('panelAdded', { panelAdded: newPanel});
      return newPanel;
    },
    removePanel: (root, {id}) => {
      const index = panels.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Panel id ${id} does not exist`);
      }
      const removedItem = panels.splice(index, 1);
      pubsub.publish('panelRemoved', { panelRemoved: {id: id}});
      return removedItem[0]
    },
    updatePanel: (root, {input: {id, title}}) => {
      const index = panels.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Panel id ${id} does not exist`);
      }
      panels[index] = {id: id, title: title};
      pubsub.publish('panelUpdated', { panelUpdated: {id: id, title: title}});
      return panels[index];
    }
  },
  Subscription: {
    panelUpdated: {
      subscribe: withFilter(() => pubsub.asyncIterator('panelUpdated'), (payload, variables) => {
        // We will get all the updated panels at this moment.
        return true;
      })
    },
    panelRemoved: {
      subscribe: withFilter(() => pubsub.asyncIterator('panelRemoved'), (payload, variables) => {
        // We will get all the updated panels at this moment.
        return true;
      })
    },
    panelAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('panelAdded'), (payload, variables) => {
        // We will get all the updated panels at this moment.
        return true;
      })
    }
  }
};