const hash = (string, length = 12) => {
  let hash = 5381;
  let i = string.length;

  while(i) {
    hash = (hash * 33) ^ string.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  hash = hash >>> 0;
  return ('0'.repeat(length) + hash).slice(length * -1);
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

export {
  hash,
  getPanelData
};
