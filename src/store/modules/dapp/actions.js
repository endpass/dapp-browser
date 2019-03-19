import { createConnect, web3, demoAccount } from '@/class/singleton';
import { LOAD_STATE } from '@/constants';

const basicConnect = createConnect({
  namespace: 'basic',
});
let connect = basicConnect;
let demoConnect;

const init = async ({ commit, dispatch }) => {
  try {
    const accountData = await basicConnect.getAccountData();
    commit('setAccountData', accountData);
    commit('setDemoMode', false);
  } catch (err) {
    dispatch('initDemo');
  }
};

const initDemo = ({ commit }) => {
  if (!demoConnect) {
    demoConnect = createConnect({
      namespace: 'demo',
      demoData: demoAccount.getDemoData(),
    });
  }
  connect = demoConnect;
  const accountData = demoAccount.getSettings();
  commit('setAccountData', accountData);
  commit('setDemoMode', true);
};

const inject = async ({ state, commit, dispatch }, dappWindow) => {
  if (state.injected) return;

  const provider = connect.getProvider();
  web3.setProvider(provider);

  commit('changeInjectStatus', true);
  await dispatch('setProviderSettings');

  Object.assign(dappWindow, {
    ethereum: web3.currentProvider,
    web3,
  });
};

const toInitial = ({ commit }) => {
  commit('changeInjectStatus', false);
  commit('changeLoadState', LOAD_STATE.INITIAL);
};

const beforeInject = ({ commit }) => {
  commit('changeInjectStatus', false);
  commit('changeLoadState', LOAD_STATE.LOADING);
};

const setProviderSettings = ({ state }) => {
  const { accountData } = state;
  if (accountData) {
    connect.setProviderSettings(accountData);
  }
};

const auth = async ({ state, dispatch, commit }) => {
  try {
    await basicConnect.auth(window.location.toString());
    const res = await basicConnect.getAccountData();
    commit('setAccountData', res);
    commit('setDemoMode', false);
  } catch (err) {
    commit('setAccountData', null);
    dispatch('initDemo');
    console.error(`Auth failed: ${err}`);
  }
};

const logout = async ({ dispatch, commit }) => {
  try {
    await basicConnect.logout();
    await dispatch('toInitial');
    commit('setAccountData', null);
    dispatch('initDemo');
  } catch (err) {
    console.error(`Logout failed: ${err}`);
  }
};

const openAccount = async ({ state, commit, dispatch }) => {
  const useConnect = state.isDemoMode ? demoConnect : basicConnect;

  const { type, settings } = await useConnect.openAccount();

  if (type === 'logout') {
    await dispatch('logout');
  } else if (type === 'update') {
    commit('setAccountData', settings);
    await dispatch('setProviderSettings');
    await dispatch('toInitial');
  }
};

export default {
  init,
  initDemo,
  auth,
  beforeInject,
  inject,
  setProviderSettings,
  toInitial,
  logout,
  openAccount,
};
