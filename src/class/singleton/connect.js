import EndpassConnect from '@endpass/connect';

const connect = new EndpassConnect({
  appUrl: ENV.connect.url,
  subscribe: true,
});

export default connect;
