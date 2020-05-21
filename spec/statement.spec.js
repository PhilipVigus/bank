import Statement from '../src/statement';

describe('Statement', () => {
  const date = new Date();

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
        type: 'withdrawal',
        amount: 1000,
        balanceAfterDeposit: 1000,
        date,
        printStatementLine() {},
      };

      spyOn(transaction1, 'printStatementLine');

      const statement = new Statement([transaction1, transaction2]);
      statement.print();

      expect(transaction1.printStatementLine).toHaveBeenCalledWith();
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
        type: 'withdrawal',
        amount: 1000,
        balanceAfterDeposit: 1000,
        date,
        printStatementLine() {},
      };

      spyOn(transaction2, 'printStatementLine');

      const statement = new Statement([transaction1, transaction2]);
      statement.print();

      expect(transaction2.printStatementLine).toHaveBeenCalledWith();
    });
  });
});
