import Account from '../../src/account';

describe('Account feature tests', () => {
  let dateString;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate();
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    dateString = `${day}/${month}/${year}`;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('deposit and withdraw money, print their account statement', () => {
    const account = new Account();

    expect(account.printStatement()).toEqual(
      'date || credit || debit || balance'
    );

    expect(account.deposit(100)).toEqual('100.00 successfully deposited');
    expect(account.deposit(200.23)).toEqual('200.23 successfully deposited');
    expect(account.withdraw(50.23)).toEqual('50.23 successfully withdrawn');
    expect(account.deposit(-100)).toEqual(
      'Unable to make deposit - amount is invalid'
    );

    expect(account.withdraw()).toEqual(
      'Unable to make withdrawal - amount is invalid'
    );

    expect(account.withdraw(20000)).toEqual(
      'Unable to make withdrawal - insufficient funds'
    );

    expect(account.printStatement()).toEqual(
      `date || credit || debit || balance\n${dateString} || || 50.23 || 250.00\n` +
        `${dateString} || 200.23 || || 300.23\n${dateString} || 100.00 || || 100.00`
    );
  });
});
