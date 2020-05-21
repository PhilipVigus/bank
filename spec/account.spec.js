import Account from '../src/account';

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

      const account = new Account({ Deposit: {}, withdrawal: {} });
      account.printStatement(StatementMockFunction);

      expect(statementMockInstance.print).toHaveBeenCalledWith();
    });
  });

  describe('.deposit', () => {
    it('creates a new deposit', () => {
      const DepositMock = function DepositMock() {
        return {};
      };

      const transactionTypes = {
        Deposit: DepositMock,
        Withdraw: {},
      };

      const account = new Account(transactionTypes);

      expect(account.deposit(100)).toEqual('100.00 successfully deposited');
    });
  });

  describe('.withdraw', () => {
    it('creates a withdrawal', () => {
      const withdrawalMock = function withdrawalMock() {
        return {};
      };

      const transactionTypes = {
        Deposit: {},
        Withdrawal: withdrawalMock,
      };

      const account = new Account(transactionTypes);

      expect(account.withdraw(100)).toEqual('100.00 successfully withdrawn');
    });
  });
});
