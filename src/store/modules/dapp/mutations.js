const changeInjectStatus = (state, status) => {
  state.injected = status;
};

const changeLoadState = (state, status) => {
  state.loadState = status;
};

const setAccountData = (state, data) => {
  state.accountData = data;
};

export default {
  changeInjectStatus,
  changeLoadState,
  setAccountData,
};
