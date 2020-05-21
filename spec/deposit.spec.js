const Deposit = require('../src/deposit.js');

describe('Deposit', () => {
  let date = new Date();
  let deposit;

  describe('valid deposits', () => {
    it('allows you to deposit a valid amount', () => {
      function isValidAmount() {
        return true;
      }
      const details = { date, amount: 3000, balance: 0 };

      expect(() => {
        deposit = new Deposit(details, isValidAmount);
      }).not.toThrow();
    });
  });

  describe('invalid deposits', () => {
    it('refuses a deposit when the amount is invalid', () => {
      function isValidAmount() {
        return false;
      }
      const details = { date, amount: 0, balance: 0 };

      expect(() => {
        deposit = new Deposit(details, isValidAmount);
      }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });
  });

  describe('.printStatementLine', () => {
    let dateString;

    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate();

      date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      dateString = `${day}/${month}/${year}`;
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('prints the line for the deposit', () => {
      deposit = new Deposit({ date, amount: 3000, balance: 0 });

      expect(deposit.printStatementLine()).toEqual(
        `${dateString} || 3000.00 || || 3000.00`
      );
    });

    it('prints the line for a decimal deposit', () => {
      deposit = new Deposit({ date, amount: 3000.12, balance: 0 });

      expect(deposit.printStatementLine()).toEqual(
        `${dateString} || 3000.12 || || 3000.12`
      );
    });
  });
});
