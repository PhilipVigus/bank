const Bank = require('../src/bank.js');

describe('Bank', () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
  });

  it('prints a blank statement', () => {
    expect(bank.printStatement()).toEqual('date || credit || debit || balance');
  });

  it('allows you to deposit money', () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    expect(bank.deposit(1000)).toEqual(`1000 successfully deposited on ${day}/${month}/${year}`);
  });
});
