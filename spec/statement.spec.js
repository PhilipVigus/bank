const Statement = require('../src/statement.js');

describe('Statement', () => {
  let date;
  let dateString;

  beforeEach(() => {
    jasmine.clock().install();
    date = new Date();
    jasmine.clock.mockDate;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    dateString = `${day}/${month}/${year}`;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('.print', () => {
    describe('blank statements', () => {
      it('prints a blank statement', () => {
        const statement = new Statement();
        expect(statement.print()).toEqual('date || credit || debit || balance');
      });
    });

    it('calls printStatementLine on the first statement transaction', () => {
      const transaction1 = {
        type: 'deposit',
        amount: 2000,
        balanceAfterDeposit: 2000,
        date,
        printStatementLine() {},
      };

      const transaction2 = {
        type: 'withdrawl',
        amount: 1000,
        balanceAfterDeposit: 1000,
        date,
        printStatementLine() {},
      };

      spyOn(transaction1, 'printStatementLine');

      const statement = new Statement([transaction1, transaction2]);
      statement.print();
      expect(transaction1.printStatementLine).toHaveBeenCalled();
    });

    it('calls printStatementLine on the second statement transaction', () => {
      const transaction1 = {
        type: 'deposit',
        amount: 2000,
        balanceAfterDeposit: 2000,
        date,
        printStatementLine() {},
      };

      const transaction2 = {
        type: 'withdrawl',
        amount: 1000,
        balanceAfterDeposit: 1000,
        date,
        printStatementLine() {},
      };

      spyOn(transaction2, 'printStatementLine');

      const statement = new Statement([transaction1, transaction2]);
      statement.print();
      expect(transaction2.printStatementLine).toHaveBeenCalled();
    });
  });
});
