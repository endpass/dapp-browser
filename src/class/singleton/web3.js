import { ProviderFactory } from '@/class/provider';
import Web3Factory from '@/class/web3/Web3Factory';
import { DEFAULT_NETWORKS } from '@/constants';

const defaultProvider = ProviderFactory.create(DEFAULT_NETWORKS[0].url);

const web3 = Web3Factory.create(defaultProvider);

export default web3;
