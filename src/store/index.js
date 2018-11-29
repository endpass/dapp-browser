import Vue from 'vue';
import Vuex from 'vuex';
import dapp from './modules/dapp';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dapp,
  },
});
