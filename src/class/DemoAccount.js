import Bip39 from 'bip39';
import HDKey from 'ethereumjs-wallet/hdkey';
import { keystore } from '@endpass/utils';
import Storage from '@/class/Storage';
import { DEMO_DEFAULT_PASSWORD, NET_ID } from '@/constants';

const NET_ROPSTEN = NET_ID.ROPSTEN;
const STORAGE_ACCOUNT_KEY = 'demo-data';

export default class DemoAccount {
  constructor() {
    this.storage = new Storage('demo-account');
  }

  static createV3Keystore() {
    const key = Bip39.generateMnemonic();
    const seed = Bip39.mnemonicToSeed(key);
    const hdKey = HDKey.fromMasterSeed(seed);
    const hdWallet = hdKey.derivePath(ENV.hdKeyMnemonic.path);
    const wallet = hdWallet.deriveChild(0).getWallet();

    const v3KeyStore = keystore.encryptWallet(DEMO_DEFAULT_PASSWORD, wallet);

    return v3KeyStore;
  }

  getSettings() {
    const stored = this.getDemoData();
    return {
      activeAccount: stored.v3KeyStore.address,
      activeNet: NET_ROPSTEN,
    };
  }

  getDemoData() {
    let stored = this.storage.load(STORAGE_ACCOUNT_KEY);
    if (!stored) {
      const v3KeyStore = DemoAccount.createV3Keystore();

      stored = {
        v3KeyStore,
        activeNet: NET_ROPSTEN,
        password: DEMO_DEFAULT_PASSWORD,
      };

      this.storage.save(STORAGE_ACCOUNT_KEY, stored);
    }
    return stored;
  }
}
