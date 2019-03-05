const prod = require('./prod');
const dev = require('./dev');
const test = require('./test');

let local;
try {
  local = require('./local');
} catch (e) {}

const getEnv = env => {
  switch (env.toLowerCase()) {
    case 'production':
      return prod;
    case 'development':
      return dev;
    case 'test':
      return test;
    default:
      return local || dev;
  }
};

module.exports = {
  getEnv,
};
