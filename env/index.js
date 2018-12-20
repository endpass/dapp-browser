const prod = require('./prod');
const dev = require('./dev');
const test = require('./test');
const local = require('./local');

const getEnv = env => {
  switch (env.toLowerCase()) {
    case 'production':
      return prod;
    case 'development':
      return dev;
    case 'test':
      return test;
    default:
      return local;
  }
};

module.exports = {
  getEnv,
};
