import Account from '../src/accountNew';

describe('Account', () => {
  describe('.printStatement', () => {
    it('calls print on the statement', () => {
      const statementMockInstance = {
        print() {},
      };
      spyOn(statementMockInstance, 'print');
      const StatementMockFunction = function StatementMockFunction() {
        return statementMockInstance;
      };

      const account = new Account();
      account.printStatement(StatementMockFunction);

      expect(statementMockInstance.print).toHaveBeenCalledWith();
    });
  });

  describe('.deposit', () => {
    it('creates a new deposit', () => {
      const TransactionMock = function DepositMock() {
        return {};
      };

      const account = new Account(TransactionMock);

      expect(account.deposit(100)).toEqual('100.00 successfully deposited');
    });
  });

  describe('.withdraw', () => {
    it('creates a withdrawal', () => {
      const TransactionMock = function TransactionMock() {
        return {};
      };

      const account = new Account(TransactionMock);
      account.deposit(100);

      expect(account.withdraw(100)).toEqual('100.00 successfully withdrawn');
    });
  });
});
