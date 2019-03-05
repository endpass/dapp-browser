const hdKeyMnemonic = {
  path: `m/44'/60'/0'/0`, // Derivation path
};
const infura = {
  key: 'zU4GTAQ0LjJNKddbyztc',
};
const proxy = {
  url: 'https://wildproxy.endpass.net',
};
const connect = {
  url: 'https://auth.endpass.com',
};

const kdfParams = {
  kdf: 'scrypt',
  n: 8192,
};

module.exports = {
  hdKeyMnemonic,
  infura,
  proxy,
  connect,
  kdfParams,
};
