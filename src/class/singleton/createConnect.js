import EndpassConnect from '@endpass/connect';

export default function(options) {
  const connect = new EndpassConnect({
    authUrl: ENV.connect.url,
    ...options,
  });
  return connect;
}
