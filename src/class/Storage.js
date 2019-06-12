import { LocalStorage } from '@endpass/class';

const PREFIX = '-endpass-dapp-';

class Storage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  static getStoreKey(ns, key) {
    return `${PREFIX}:${ns}:${key}`;
  }

  remove(key) {
    return LocalStorage.remove(Storage.getStoreKey(this.namespace, key));
  }

  load(key) {
    return LocalStorage.load(Storage.getStoreKey(this.namespace, key));
  }

  save(key, data) {
    return LocalStorage.save(Storage.getStoreKey(this.namespace, key), data);
  }
}

export default Storage;
