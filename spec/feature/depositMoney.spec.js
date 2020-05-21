const Account = require('../../src/account.js');

describe('user depositing money', () => {
  it('allows the user to deposit money', () => {
    const account = new Account();

    expect(account.deposit(100)).toEqual('100.00 successfully deposited');
  });

  it('prevents the user from depositing a negative amount', () => {
    const account = new Account();

    expect(account.deposit(-100)).toEqual(
      'Unable to make deposit - amount is invalid',
    );
  });

  it('prevents the user from depositing a non-number amount', () => {
    const account = new Account();

    expect(account.deposit('Not a number')).toEqual(
      'Unable to make deposit - amount is invalid',
    );
  });

  it('prevents the user from depositing a string number amount', () => {
    const account = new Account();

    expect(account.deposit('100')).toEqual(
      'Unable to make deposit - amount is invalid',
    );
  });

  it('prevents the user from depositing an unspecified amount', () => {
    const account = new Account();

    expect(account.deposit()).toEqual(
      'Unable to make deposit - amount is invalid',
    );
  });
});
