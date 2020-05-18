const Account = require('../src/account.js');
const todayAsString = require('../src/todayAsString.js'); 

describe('Bank', () => {
  let account;

  beforeEach(() => {
    account = new Account();
    jasmine.clock().install();
    jasmine.clock.mockDate;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('.printStatement', () => {
    it('prints a blank statement', () => {
      expect(account.printStatement()).toEqual('date || credit || debit || balance');
    });

    it('shows a deposit', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${todayAsString()} || 2000.00 || || 2000.00`;

      account.deposit(2000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows multiple deposits', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${todayAsString()} || 1000.00 || || 1000.00\n`
        + `${todayAsString()} || 2000.00 || || 3000.00`;

      account.deposit(1000);
      account.deposit(2000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a decimal deposit', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${todayAsString()} || 2000.32 || || 2000.32`;

      account.deposit(2000.32);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 1000', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${todayAsString()} || || 1000.00 || -1000.00`;

      account.withdraw(1000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 2000', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${todayAsString()} || || 2000.00 || -2000.00`;

      account.withdraw(2000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 1000.32', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${todayAsString()} || || 1000.32 || -1000.32`;

      account.withdraw(1000.32);
      expect(account.printStatement()).toEqual(expectedOutput);
    });
  });

  describe('.deposit', () => {
    it('allows you to deposit 1000 pounds', () => {
      expect(account.deposit(1000)).toEqual(`1000 successfully deposited on ${todayAsString()}`);
    });

    it('allows you to deposit 2000 pounds', () => {
      expect(account.deposit(2000)).toEqual(`2000 successfully deposited on ${todayAsString()}`);
    });

    it('refuses deposits unless they are positive', () => {
      expect(account.deposit(0)).toEqual('Unable to make deposit - amount must be positive');
    });
  });

  describe('.withdraw', () => {
    it('allows you to withdraw 1000 pounds', () => {
      expect(account.withdraw(1000)).toEqual(`1000 successfully withdrawn on ${todayAsString()}`);
    });

    it('allows you to withdraw 2000 pounds', () => {
      expect(account.withdraw(2000)).toEqual(`2000 successfully withdrawn on ${todayAsString()}`);
    });

    it('refuses withdrawls unless they are positive', () => {
      expect(account.withdraw(0)).toEqual('Unable to make withdrawl - amount must be positive');
    });
  });
});
