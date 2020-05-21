const Account = require('../../src/account.js');

describe('user printing statements', () => {
  it('user can print their statement when it is empty', () => {
    const account = new Account();

    expect(account.printStatement()).toEqual(
      'date || credit || debit || balance',
    );
  });

  it('prints a deposit', () => {
    const expectedOutput = 'date || credit || debit || balance\n'
      + '19/05/2020 || 100.00 || || 100.00';

    const account = new Account();
    account.deposit(100);

    expect(account.printStatement()).toEqual(expectedOutput);
  });

  it('prints a withdrawl', () => {
    const expectedOutput = 'date || credit || debit || balance\n'
      + '19/05/2020 || || 100.00 || 0.00\n'
      + '19/05/2020 || 100.00 || || 100.00';

    const account = new Account();
    account.deposit(100);
    account.withdraw(100);

    expect(account.printStatement()).toEqual(expectedOutput);
  });

  it('prints in reverse chronological order', () => {
    const expectedOutput = 'date || credit || debit || balance\n'
      + '19/05/2020 || || 100.45 || 2000.09\n'
      + '19/05/2020 || 2000.21 || || 2100.54\n'
      + '19/05/2020 || 100.33 || || 100.33';

    const account = new Account();
    account.deposit(100.33);
    account.deposit(2000.21);
    account.withdraw(100.45);

    expect(account.printStatement()).toEqual(expectedOutput);
  });
});
