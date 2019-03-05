jest.mock('@/class/Storage', () => {
  class Storage {}

  Storage.prototype.remove = jest.fn();
  Storage.prototype.load = jest.fn();
  Storage.prototype.save = jest.fn();

  return Storage;
});
