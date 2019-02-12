import mutations from './mutations';
import actions from './actions';
import { LOAD_STATE } from '@/constants';

export const state = {
  accountData: null,
  injected: false,
  loadState: LOAD_STATE.INITIAL,
};

export default {
  state,
  mutations,
  actions,
};
