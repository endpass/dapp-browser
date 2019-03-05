import Web3 from 'web3';

jest.mock('web3', () => {
  class MockWeb3 {}

  MockWeb3.prototype.setProvider = jest.fn();

  return MockWeb3;
});

export default Web3;
