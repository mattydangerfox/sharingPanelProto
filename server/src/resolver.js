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

const getPanelData = (query) => {
  return {
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [{
      data: hash(query).split('').map(e => parseInt(e))
    }]
  }
};


let panelCounter = 0;
let panelQueryCounter = 0;
const panels = [];

const user1 = {id: "1"};
const user2 = {id: "2"};
const defaultPanelShape = {height: 500, width: 600};

const panelQuery1 = {
  id: ++panelQueryCounter,
  owner: user1,
  sharedWith: [user2],
  esQuery: {query: 'Summer trend 2016'}
};

const panelA = {
  id: ++panelCounter,
  owner: user1,
  panelShape: defaultPanelShape,
  panelQuery: panelQuery1
};

const panelB = {
  id: ++panelCounter,
  owner: user2,
  panelShape: defaultPanelShape,
  panelQuery: panelQuery1
};

panels.push(panelA);
panels.push(panelB);

export const resolvers = {
  Query: {
    panels: ( object, { input: { userId }} ) => {
      return {
        panels: panels.filter(panel => panel.owner.id === userId)
      };
    },
    search: ( object, { input: { query }} ) => {
      return {
        panelData: getPanelData(query)
      }
    }
  }
};
