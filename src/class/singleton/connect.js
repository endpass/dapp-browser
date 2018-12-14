import EndpassConnect from 'endpass-connect';

const connect = new EndpassConnect({
  appUrl: 'http://localhost:5000',
  subscribe: true,
});

export default connect;
