const StatementPrinter = require('../src/statementPrinter.js');

describe('AccountPrinter', () => {
  let date;
  let dateString;

  beforeAll(() => {
    jasmine.clock().install();
    date = new Date();
    jasmine.clock.mockDate;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    dateString = `${day}/${month}/${year}`;
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  describe('.printStatement', () => {
    describe('blank statements', () => {
      it('prints a blank statement', () => {
        const statementPrinter = new StatementPrinter([]);
        expect(statementPrinter.printStatement()).toEqual('date || credit || debit || balance');
      });
    });

    describe('deposits', () => {
      it('shows a deposit', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || 2000.00 || || 2000.00`;

        const statementPrinter = new StatementPrinter([{
          type: 'deposit', amount: 2000, balance: 2000, date,
        }]);

        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows multiple deposits', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || 2000.00 || || 3000.00\n`
          + `${dateString} || 1000.00 || || 1000.00`;

        const accountHistory = [
          { type: 'deposit', amount: 2000, balance: 3000, date },
          { type: 'deposit', amount: 1000, balance: 1000, date },
        ];

        const statementPrinter = new StatementPrinter(accountHistory);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows a decimal deposit', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || 2000.32 || || 2000.32`;

        const statementPrinter = new StatementPrinter([{
          type: 'deposit', amount: 2000.32, balance: 2000.32, date,
        }]);

        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });
    });

    describe('withdrawls', () => {
      it('shows a withdrawl of 1000', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
        + `${dateString} || || 1000.00 || 2000.00\n`
        + `${dateString} || 3000.00 || || 3000.00`;

        const accountHistory = [
          { type: 'withdraw', amount: 1000, balance: 2000, date },
          { type: 'deposit', amount: 3000, balance: 3000, date },
        ];

        const statementPrinter = new StatementPrinter(accountHistory);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows a withdrawl of 2000', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || || 2000.00 || 0.00\n`
          + `${dateString} || 2000.00 || || 2000.00`;

        const accountHistory = [
          { type: 'withdraw', amount: 2000, balance: 0, date },
          { type: 'deposit', amount: 2000, balance: 2000, date },
        ];

        const statementPrinter = new StatementPrinter(accountHistory);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });

      it('shows a withdrawl of 1000.32', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || || 1000.50 || 999.50\n`
          + `${dateString} || 2000.00 || || 2000.00`;

        const accountHistory = [
          { type: 'withdraw', amount: 1000.50, balance: 999.50, date },
          { type: 'deposit', amount: 2000, balance: 2000, date },
        ];

        const statementPrinter = new StatementPrinter(accountHistory);
        expect(statementPrinter.printStatement()).toEqual(expectedOutput);
      });
    });
  });
});
