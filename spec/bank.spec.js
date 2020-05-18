const Bank = require('../src/bank.js');

describe('Bank', () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
  });

  it('prints a blank statement', () => {
    expect(bank.printStatement()).toEqual('date || credit || debit || balance');
  });
});
