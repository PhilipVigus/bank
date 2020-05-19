const Account = require('../../src/account.js');

describe('user withdrawing money', () => {
  it('allows the user to withdraw money', () => {
    const account = new Account();
    account.deposit(1000);
    expect(account.withdraw(100)).toEqual('100.00 successfully withdrawn');
  });

  it('prevents the user from withdrawing a negative amount', () => {
    const account = new Account();
    expect(account.withdraw(-100)).toEqual('Unable to make withdrawl - amount is invalid');
  });

  it('prevents the user from withdrawing a non-number amount', () => {
    const account = new Account();
    expect(account.withdraw('Not a number')).toEqual('Unable to make withdrawl - amount is invalid');
  });

  it('prevents the user from withdrawing a string number amount', () => {
    const account = new Account();
    expect(account.withdraw('100')).toEqual('Unable to make withdrawl - amount is invalid');
  });

  it('prevents the user from withdrawing an unspecified amount', () => {
    const account = new Account();
    expect(account.withdraw()).toEqual('Unable to make withdrawl - amount is invalid');
  });

  it('prevents the user from withdrawing when funds are unavailable', () => {
    const account = new Account();
    expect(account.withdraw(100)).toEqual('Unable to make withdrawl - insufficient funds');
  });
});
