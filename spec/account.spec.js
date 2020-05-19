const Account = require('../src/account.js');

describe('Account', () => {
  let account;

  beforeEach(() => {
    account = undefined;
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

      account = new Account({ Deposit: {}, Withdrawl: {} });
      account.printStatement(StatementMockFunction);
      expect(statementMockInstance.print).toHaveBeenCalled();
    });
  });

  describe('.deposit', () => {
    it('creates a new deposit', () => {
      const DepositMock = function DepositMock() {
        DepositMock.numberCreated += 1;
        return {};
      };
      DepositMock.numberCreated = 0;

      const transactionTypes = {
        Deposit: DepositMock,
        Withdraw: {},
      };

      account = new Account(transactionTypes);
      account.deposit(100);
      expect(DepositMock.numberCreated).toEqual(1);
    });
  });

  describe('.withdraw', () => {
    it('creates a withdrawl', () => {
      const WithdrawlMock = function WithdrawlMock() {
        WithdrawlMock.numberCreated += 1;
        return {};
      };
      WithdrawlMock.numberCreated = 0;

      const transactionTypes = {
        Deposit: {},
        Withdrawl: WithdrawlMock,
      };

      account = new Account(transactionTypes);
      account.withdraw(100);
      expect(WithdrawlMock.numberCreated).toEqual(1);
    });
  });
});
