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
    it('calls printStatement on the statement printer', () => {
      const printerMockInstance = {
        printStatement() {},
      };
      spyOn(printerMockInstance, 'printStatement');
      const StatementPrinterMockFunction = function StatementPrinter() {
        return printerMockInstance;
      };

      account.printStatement(StatementPrinterMockFunction);
      expect(printerMockInstance.printStatement).toHaveBeenCalled();
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

    it('refuses deposits with too many decimal places', () => {
      expect(account.deposit(1000.123)).toEqual('Unable to make deposit - amount has too many decimal places');
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

    it('refuses deposits with too many decimal places', () => {
      account.deposit(3000);
      expect(account.withdraw(1000.123)).toEqual('Unable to make withdrawl - amount has too many decimal places');
    });
  });
});
