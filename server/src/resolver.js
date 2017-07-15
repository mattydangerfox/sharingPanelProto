import { PubSub, withFilter } from 'graphql-subscriptions';

const hash = (str) => {
  let hash = 5381,
    i = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  hash = hash >>> 0;
  return ("000000000000" + hash).slice(-12);
};

const getPanelData = (title) => {
  return {
    title: {
      text: title
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [{
      data: hash(title).split('').map(e => parseInt(e))
    }]
  }
};


const panels = [{
  owner: '0',
  id: '1',
  title: 'apple value',
  panelData: getPanelData('apple value')
}, {
  owner: '0',
  id: '2',
  title: 'banana value',
  panelData: getPanelData('banana value')
}];

let nextId = 3;
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    panels: ( root, { userId } ) => {
      if (userId === 'admin') {
        return panels
      }
      const a = panels.filter(panel => panel.owner === userId);
      return a
    }
  },
  Mutation: {
    addPanel: (root, args) => {
      const { input: { owner, title }} = args;
      const newPanel = {
        owner: owner,
        id: String(nextId++),
        title: title,
        panelData: getPanelData(title),
      };
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
      const newPanel = {
        owner: panels[index].owner,
        id: id,
        title: title,
        panelData: getPanelData(title),
      };
      panels[index] = newPanel;
      pubsub.publish('panelUpdated', { panelUpdated: newPanel});
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
        if (variables.userId === 'admin') {
          return true;
        }
        return payload.panelAdded.owner === variables.userId;
      })
    }
  }
};