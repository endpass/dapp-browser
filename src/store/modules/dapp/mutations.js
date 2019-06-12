const changeInjectStatus = (state, status) => {
  state.injected = status;
};

const changeLoadState = (state, status) => {
  state.loadState = status;
};

const setAccountData = (state, data) => {
  state.accountData = data;
};

const setDemoMode = (state, data) => {
  state.isDemoMode = data;
};

export default {
  changeInjectStatus,
  changeLoadState,
  setAccountData,
  setDemoMode,
};
