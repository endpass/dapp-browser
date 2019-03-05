export const DEMO_DEFAULT_PASSWORD = '12345678';

export const LOAD_STATE = Object.freeze({
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
});

export const NET_ID = Object.freeze({
  MAIN: 1,
  ROPSTEN: 3,
  RIN: 4,
  ETH_CLASSIC: 61,
});

/**
 * Networks map
 */
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
  RIN: [`https://rinkeby.infura.io/${ENV.infura.key}`],
  ETC: [
    // 'wss://etc-mainnet.endpass.com:2084',
    // 'wss://etc-mainnet.endpass.com',
    'https://etc-mainnet.endpass.com:2083',
    'https://etc-geth.0xinfra.com',
  ],
});

export const DEFAULT_NETWORKS = Object.freeze({
  [NET_ID.MAIN]: {
    id: NET_ID.MAIN,
    networkType: 'main',
    currency: 1,
    name: 'Main',
    url: NETWORK_URL.ETH,
  },
  [NET_ID.ROPSTEN]: {
    id: NET_ID.ROPSTEN,
    name: 'Ropsten',
    networkType: 'ropsten',
    currency: 2,
    url: NETWORK_URL.ROP,
  },
  [NET_ID.RIN]: {
    id: NET_ID.RIN,
    name: 'Rinkeby',
    networkType: 'rinkeby',
    currency: 2,
    url: NETWORK_URL.RIN,
  },
  [NET_ID.ETH_CLASSIC]: {
    id: NET_ID.ETH_CLASSIC,
    name: 'Ethereum classic',
    networkType: 'ethClassic',
    currency: 3,
    url: NETWORK_URL.ETC,
  },
});
