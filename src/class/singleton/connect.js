import EndpassConnect from '@endpass/connect';

const connect = new EndpassConnect({
  authUrl: ENV.connect.url,
});

export default connect;
