import { connect } from '@/class/singleton';

const inject = async ({ state, commit, dispatch }, dappWindow) => {
  if (state.injected) return;

  commit('changeInjectStatus', true);
  await dispatch('sendSettings');
  connect.injectWeb3(dappWindow);
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
    await connect.auth(window.location.href);
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
  auth,
  getAccountData,
  inject,
  sendSettings,
  reset,
  logout,
};
