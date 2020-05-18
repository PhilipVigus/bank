const StatementPrinter = require('../src/statementPrinter.js');

describe('AccountPrinter', () => {
  function todayAsString() { return '01/11/2013'; }

  describe('.printStatement', () => {
    describe('blank statements', () => {
      it('prints a blank statement', () => {
        const statementPrinter = new StatementPrinter([], todayAsString);
        expect(statementPrinter.printStatement()).toEqual('date || credit || debit || balance');
      });
    });

    describe('deposits', () => {
      it('shows a deposit', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + '01/11/2013 || 2000.00 || || 2000.00';

        const statementPrinter = new StatementPrinter(
          [{ type: 'deposit', amount: 2000, balance: 2000 }],
          todayAsString,
        );

        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows multiple deposits', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + '01/11/2013 || 2000.00 || || 3000.00\n'
          + '01/11/2013 || 1000.00 || || 1000.00';

        const accountHistory = [
          { type: 'deposit', amount: 2000, balance: 3000 },
          { type: 'deposit', amount: 1000, balance: 1000 },
        ];

        const statementPrinter = new StatementPrinter(accountHistory, todayAsString);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows a decimal deposit', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + '01/11/2013 || 2000.32 || || 2000.32';

        const statementPrinter = new StatementPrinter(
          [{ type: 'deposit', amount: 2000.32, balance: 2000.32 }],
          todayAsString,
        );

        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });
    });

    describe('withdrawls', () => {
      it('shows a withdrawl of 1000', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
        + '01/11/2013 || || 1000.00 || 2000.00\n'
        + '01/11/2013 || 3000.00 || || 3000.00';

        const accountHistory = [
          { type: 'withdraw', amount: 1000, balance: 2000 },
          { type: 'deposit', amount: 3000, balance: 3000 },
        ];

        const statementPrinter = new StatementPrinter(accountHistory, todayAsString);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows a withdrawl of 2000', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + '01/11/2013 || || 2000.00 || 0.00\n'
          + '01/11/2013 || 2000.00 || || 2000.00';

        const accountHistory = [
          { type: 'withdraw', amount: 2000, balance: 0 },
          { type: 'deposit', amount: 2000, balance: 2000 },
        ];

        const statementPrinter = new StatementPrinter(accountHistory, todayAsString);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows a withdrawl of 1000.32', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + '01/11/2013 || || 1000.50 || 999.50\n'
          + '01/11/2013 || 2000.00 || || 2000.00';

        const accountHistory = [
          { type: 'withdraw', amount: 1000.50, balance: 999.50 },
          { type: 'deposit', amount: 2000, balance: 2000 },
        ];

        const statementPrinter = new StatementPrinter(accountHistory, todayAsString);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });
    });
  });
});
