import { connect, web3 } from '@/class/singleton';

console.log(web3);

const init = () => {
  const provider = connect.createProvider(web3);

  web3.setProvider(provider);
};

const inject = async ({ state, commit, dispatch }, dappWindow) => {
  if (state.injected) return;

  commit('changeInjectStatus', true);
  await dispatch('setProviderSettings');

  Object.assign(dappWindow, {
    ethereum: web3.currentProvider,
    web3,
  });
};

const reset = ({ commit }) => {
  commit('changeInjectStatus', false);
  commit('changeLoadStatus', false);
};

const setProviderSettings = ({ state }) => {
  const { accountData } = state;

  if (accountData) {
    connect.setProviderSettings(accountData);
  }
};

const auth = async ({ dispatch }) => {
  try {
    await connect.auth(window.location.origin);
    await dispatch('getAccountData');
  } catch (err) {
    console.error(`Auth failed: ${err}`);
  }
};

const logout = async ({ dispatch, commit }) => {
  try {
    await connect.logout();
    await dispatch('reset');
    commit('setAccountData', null);
  } catch (err) {
    console.error(`Logout failed: ${err}`);
  }
};

const getAccountData = async ({ commit }) => {
  try {
    const res = await connect.getAccountData();

    commit('setAccountData', res);
  } catch (err) {
    commit('setAccountData', null);
  }
};

const openAccount = async ({ commit, dispatch }) => {
  const { type, payload } = await connect.openAccount();

  if (type === 'logout') {
    commit('setAccountData', null);
    await dispatch('reset');
  } else if (type === 'update') {
    commit('setAccountData', payload);
    await dispatch('setProviderSettings');
    await dispatch('reset');
  }
};

export default {
  init,
  auth,
  getAccountData,
  inject,
  setProviderSettings,
  reset,
  logout,
  openAccount,
};
