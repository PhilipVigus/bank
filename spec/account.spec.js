const Account = require('../src/account.js');

describe('Bank', () => {
  let account;
  function todayAsString() { return '01/11/2013'; }

  beforeEach(() => {
    account = new Account(todayAsString);
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
        + '01/11/2013 || 2000.00 || || 2000.00';

      account.deposit(2000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows multiple deposits', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + '01/11/2013 || 2000.00 || || 3000.00\n'
        + '01/11/2013 || 1000.00 || || 1000.00';


      account.deposit(1000);
      account.deposit(2000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a decimal deposit', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + '01/11/2013 || 2000.32 || || 2000.32';

      account.deposit(2000.32);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 1000', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
      + '01/11/2013 || || 1000.00 || 2000.00\n'
      + '01/11/2013 || 3000.00 || || 3000.00';

      account.deposit(3000);
      account.withdraw(1000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 2000', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + '01/11/2013 || || 2000.00 || 0.00\n'
        + '01/11/2013 || 2000.00 || || 2000.00';

      account.deposit(2000);
      account.withdraw(2000);
      expect(account.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 1000.32', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + '01/11/2013 || || 1000.50 || 999.50\n'
        + '01/11/2013 || 2000.00 || || 2000.00';

      account.deposit(2000);
      account.withdraw(1000.50);
      expect(account.printStatement()).toEqual(expectedOutput);
    });
  });

  describe('.deposit', () => {
    it('allows you to deposit 1000 pounds', () => {
      expect(account.deposit(1000)).toEqual('1000 successfully deposited on 01/11/2013');
    });

    it('allows you to deposit 2000 pounds', () => {
      expect(account.deposit(2000)).toEqual('2000 successfully deposited on 01/11/2013');
    });

    it('refuses deposits unless they are positive', () => {
      expect(account.deposit(0)).toEqual('Unable to make deposit - amount must be positive');
    });
  });

  describe('.withdraw', () => {
    it('allows you to withdraw 1000 pounds', () => {
      account.deposit(3000);
      expect(account.withdraw(1000)).toEqual('1000 successfully withdrawn on 01/11/2013');
    });

    it('allows you to withdraw 2000 pounds', () => {
      account.deposit(3000);
      expect(account.withdraw(2000)).toEqual('2000 successfully withdrawn on 01/11/2013');
    });

    it('refuses withdrawls unless they are positive', () => {
      account.deposit(3000);
      expect(account.withdraw(0)).toEqual('Unable to make withdrawl - amount must be positive');
    });

    it('refuses withdrawls if you have insufficient funds', () => {
      expect(account.withdraw(1000)).toEqual('Unable to make withdrawl - insufficient funds');
    });
  });
});
