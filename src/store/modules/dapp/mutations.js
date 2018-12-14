import Vue from 'vue';

const changeInjectStatus = (state, status) => {
  state.injected = status;
};

const addRequest = (state, { id, request }) => {
  Object.assign(state.requests, {
    [id]: request,
  });
  state.list.push(id);
};

const removeRequest = (state, id) => {
  const requestIdx = state.list.findIndex(requestId => requestId === id);

  if (requestIdx !== -1) {
    state.list.splice(requestIdx, 1);
    Vue.delete(state.requests, id);
  }
};

const changeLoadStatus = (state, status) => {
  state.loaded = status;
};

const changeLoadingStatus = (state, status) => {
  state.loading = status;
};

const setAccountData = (state, data) => {
  state.accountData = data;
};

export default {
  addRequest,
  removeRequest,
  changeInjectStatus,
  changeLoadStatus,
  changeLoadingStatus,
  setAccountData,
};
