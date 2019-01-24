import get from 'lodash/get';
import Web3 from 'web3';
import { DEFAULT_NETWORKS } from '@/constants';

export default class Web3Factory {
  static create(netId) {
    return new Web3(get(DEFAULT_NETWORKS, `[${netId}].url[0]`));
  }
}
