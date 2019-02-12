const changeInjectStatus = (state, status) => {
  state.injected = status;
};

const changeLoadingStatus = (state, status) => {
  state.loadState = status;
};

const setAccountData = (state, data) => {
  state.accountData = data;
};

export default {
  changeInjectStatus,
  changeLoadingStatus,
  setAccountData,
};
