const Account = require('../src/account.js');

describe('Bank', () => {
  let account;

  beforeEach(() => {
    account = new Account();
  });

  describe('.printStatement', () => {
    it('calls print on the statement', () => {
      const statementMockInstance = {
        print() {},
      };
      spyOn(statementMockInstance, 'print');
      const StatementMockFunction = function StatementMockFunction() {
        return statementMockInstance;
      };

      account.printStatement(StatementMockFunction);
      expect(statementMockInstance.print).toHaveBeenCalled();
    });
  });

  describe('.deposit', () => {
    it('allows you to deposit 1000 pounds', () => {
      expect(account.deposit(1000)).toEqual('1000 successfully deposited');
    });

    it('allows you to deposit 2000 pounds', () => {
      expect(account.deposit(2000)).toEqual('2000 successfully deposited');
    });

    describe('errors', () => {
      it('refuses deposits unless they are positive', () => {
        expect(account.deposit(0)).toEqual('Unable to make deposit - amount must be positive');
      });

      it('refuses deposits with too many decimal places', () => {
        expect(account.deposit(1000.123)).toEqual('Unable to make deposit - amount has too many decimal places');
      });

      it('refuses deposits that arent numbers', () => {
        expect(account.deposit('I am not a number')).toEqual('Unable to make deposit - amount is not a number');
      });

      it('refuses deposits that are numbers as strings', () => {
        expect(account.deposit('100')).toEqual('Unable to make deposit - amount is not a number');
      });

      it('refuses deposits where no amount is specified', () => {
        expect(account.deposit()).toEqual('Unable to make deposit - amount is not specified');
      });
    });
  });

  describe('.withdraw', () => {
    it('allows you to withdraw 1000 pounds', () => {
      account.deposit(3000);
      expect(account.withdraw(1000)).toEqual('1000 successfully withdrawn');
    });

    it('allows you to withdraw 2000 pounds', () => {
      account.deposit(3000);
      expect(account.withdraw(2000)).toEqual('2000 successfully withdrawn');
    });

    describe('errors', () => {
      it('refuses withdrawls unless they are positive', () => {
        account.deposit(3000);
        expect(account.withdraw(0)).toEqual('Unable to make withdrawl - amount must be positive');
      });

      it('refuses withdrawls if you have insufficient funds', () => {
        expect(account.withdraw(1000)).toEqual('Unable to make withdrawl - insufficient funds');
      });

      it('refuses withdrawls with too many decimal places', () => {
        account.deposit(3000);
        expect(account.withdraw(1000.123)).toEqual('Unable to make withdrawl - amount has too many decimal places');
      });

      it('refuses withdrawls that arent numbers', () => {
        expect(account.withdraw('')).toEqual('Unable to make withdrawl - amount is not a number');
      });

      it('refuses withdrawls that are numbers as strings', () => {
        expect(account.withdraw('100')).toEqual('Unable to make withdrawl - amount is not a number');
      });

      it('refuses withdrawls where no amount is specified', () => {
        expect(account.withdraw()).toEqual('Unable to make withdrawl - amount is not specified');
      });
    });
  });
});
