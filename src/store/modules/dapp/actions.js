import { connect } from '@/class/singleton';

const inject = ({ state, commit, dispatch }, dappWindow) => {
  if (state.injected) return;

  commit('changeInjectStatus', true);

  connect.injectWeb3(dappWindow);

  dispatch('sendSettings');
};

// const reset = ({ commit }) => {
//   commit(CHANGE_INJECT_STATUS, false);
// };

const sendSettings = ({ state, rootGetters }) => {
  const { accountData } = state;

  if (accountData) {
    connect.sendSettings({
      selectedAddress: accountData.activeAccount,
      networkVersion: accountData.activeNet,
    });
  }
};

const auth = async ({ dispatch }) => {
  const res = await connect.auth();

  if (res.status) {
    return await dispatch('getAccountData');
  }

  return null;
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
  // reset,
};
