const Statement = require('../src/statement.js');

describe('Statement', () => {
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

  describe('.print', () => {
    describe('blank statements', () => {
      it('prints a blank statement', () => {
        const statement = new Statement();
        expect(statement.print()).toEqual('date || credit || debit || balance');
      });
    });

    describe('deposits', () => {
      it('prints a deposit', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || 2000.00 || || 2000.00`;

        const statement = new Statement([{
          type: 'deposit', amount: 2000, balanceAfterDeposit: 2000, date,
        }]);

        expect(statement.print()).toEqual(expectedOutput);
      });

      it('prints multiple deposits', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || 2000.00 || || 3000.00\n`
          + `${dateString} || 1000.00 || || 1000.00`;

        const transactions = [
          { type: 'deposit', amount: 1000, balanceAfterDeposit: 1000, date },
          { type: 'deposit', amount: 2000, balanceAfterDeposit: 3000, date },
        ];

        const statement = new Statement(transactions);
        expect(statement.print()).toEqual(expectedOutput);
      });

      it('prints a decimal deposit', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || 2000.32 || || 2000.32`;

        const statement = new Statement([{
          type: 'deposit', amount: 2000.32, balanceAfterDeposit: 2000.32, date,
        }]);

        expect(statement.print()).toEqual(expectedOutput);
      });
    });

    describe('withdrawls', () => {
      it('prints a withdrawl of 1000', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
        + `${dateString} || || 1000.00 || 2000.00\n`
        + `${dateString} || 3000.00 || || 3000.00`;

        const transactions = [
          { type: 'deposit', amount: 3000, balanceAfterDeposit: 3000, date },
          { type: 'withdraw', amount: 1000, balanceAfterWithdrawl: 2000, date },
        ];

        const statement = new Statement(transactions);
        expect(statement.print()).toEqual(expectedOutput);
      });

      it('prints a withdrawl of 2000', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || || 2000.00 || 0.00\n`
          + `${dateString} || 2000.00 || || 2000.00`;

        const transactions = [
          { type: 'deposit', amount: 2000, balanceAfterDeposit: 2000, date },
          { type: 'withdraw', amount: 2000, balanceAfterWithdrawl: 0, date },
        ];

        const statement = new Statement(transactions);
        expect(statement.print()).toEqual(expectedOutput);
      });

      it('prints a withdrawl of 1000.32', () => {
        const expectedOutput = 'date || credit || debit || balance\n'
          + `${dateString} || || 1000.50 || 999.50\n`
          + `${dateString} || 2000.00 || || 2000.00`;

        const transactions = [
          { type: 'deposit', amount: 2000, balanceAfterDeposit: 2000, date },
          { type: 'withdraw', amount: 1000.50, balanceAfterWithdrawl: 999.50, date },
        ];

        const statement = new Statement(transactions);
        expect(statement.print()).toEqual(expectedOutput);
      });
    });
  });
});
