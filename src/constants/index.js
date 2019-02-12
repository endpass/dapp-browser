/**
 * Networks map
 */
export const LOAD_STATE = Object.freeze({
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
});

export const NETWORK_URL = Object.freeze({
  ETH: [
    // 'wss://eth-mainnet.endpass.com:2084',
    // 'wss://eth-mainnet.endpass.com',
    'https://eth-mainnet.endpass.com:2083',
    `https://mainnet.infura.io/${ENV.infura.key}`,
  ],
  ROP: [
    // 'wss://eth-ropsten.endpass.com:2084',
    // 'wss://eth-ropsten.endpass.com',
    'https://eth-ropsten.endpass.com:2083',
    `https://ropsten.infura.io/${ENV.infura.key}`,
  ],
  RIN: `https://rinkeby.infura.io/${ENV.infura.key}`,
  ETC: [
    // 'wss://etc-mainnet.endpass.com:2084',
    // 'wss://etc-mainnet.endpass.com',
    'https://etc-mainnet.endpass.com:2083',
    'https://etc-geth.0xinfra.com',
  ],
});

export const DEFAULT_NETWORKS = Object.freeze({
  1: {
    id: 1,
    networkType: 'main',
    currency: 1,
    name: 'Main',
    url: NETWORK_URL.ETH,
  },
  3: {
    id: 3,
    name: 'Ropsten',
    networkType: 'ropsten',
    currency: 2,
    url: NETWORK_URL.ROP,
  },
  4: {
    id: 4,
    name: 'Rinkeby',
    networkType: 'rinkeby',
    currency: 2,
    url: NETWORK_URL.RIN,
  },
  61: {
    id: 61,
    name: 'Ethereum classic',
    networkType: 'ethClassic',
    currency: 3,
    url: NETWORK_URL.ETC,
  },
});
