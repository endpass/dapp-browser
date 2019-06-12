import DemoAccount from '@/class/DemoAccount';
import { DEMO_DEFAULT_PASSWORD, NET_ID } from '@/constants';

describe('DemoAccount', () => {
  const demoAccountInst = new DemoAccount();
  const v3KeyStoreMock = {
    address: '0x0addr',
    crypto: {},
    id: 'uuid-uuid-id',
    version: 3,
  };

  DemoAccount.createV3Keystore = jest.fn(() => v3KeyStoreMock);

  it('should return valid demoData', () => {
    const demoData = demoAccountInst.getDemoData();

    expect(demoData).toEqual({
      activeNet: NET_ID.ROPSTEN,
      password: DEMO_DEFAULT_PASSWORD,
      v3KeyStore: v3KeyStoreMock,
    });
  });

  it('should return account settings', () => {
    const settings = demoAccountInst.getSettings();

    expect(settings).toEqual({
      activeNet: NET_ID.ROPSTEN,
      activeAccount: v3KeyStoreMock.address,
    });
  });
});
