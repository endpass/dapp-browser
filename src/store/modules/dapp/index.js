import mutations from './mutations';
import actions from './actions';
// import getters from './getters';

export const state = {
  accountData: null,
  injected: false,
  loaded: false,
  loading: false,
  requests: {},
  list: [],
};

export default {
  state,
  mutations,
  actions,
  // getters,
};
