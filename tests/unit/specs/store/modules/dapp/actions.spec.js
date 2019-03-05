import dappActions from '@/store/modules/dapp/actions';
import { LOAD_STATE } from '@/constants';

describe('dapp actions', () => {
  let dispatch;
  let commit;

  beforeEach(() => {
    jest.clearAllMocks();

    dispatch = jest.fn();
    commit = jest.fn();
  });

  it('should change statuses for inject', () => {
    dappActions.beforeInject({ commit });

    expect(commit).toBeCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(1, 'changeInjectStatus', false);
    expect(commit).toHaveBeenNthCalledWith(
      2,
      'changeLoadState',
      LOAD_STATE.LOADING,
    );
  });
});
