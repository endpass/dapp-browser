import Web3 from 'web3';
import { DEFAULT_NETWORKS } from '@/constants';

export default new Web3(DEFAULT_NETWORKS[1].url);
