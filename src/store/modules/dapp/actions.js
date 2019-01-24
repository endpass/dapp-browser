import { connect, web3 } from '@/class/singleton';

const initProvider = () => {
  const provider = connect.createProvider(web3);

  web3.setProvider(provider);
};

const inject = async ({ state, commit, dispatch }, dappWindow) => {
  if (state.injected) return;

  commit('changeInjectStatus', true);
  await dispatch('sendSettings');

  Object.assign(dappWindow, {
    ethereum: web3.currentProvider,
    web3,
  });
};

const reset = ({ commit }) => {
  commit('changeInjectStatus', false);
  commit('changeLoadStatus', false);
};

const sendSettings = ({ state }) => {
  const { accountData } = state;

  if (accountData) {
    connect.sendSettings({
      selectedAddress: accountData.activeAccount,
      networkVersion: accountData.activeNet,
    });
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

export default {
  initProvider,
  auth,
  getAccountData,
  inject,
  sendSettings,
  reset,
  logout,
};
