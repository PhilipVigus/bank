const Withdrawal = require('../src/withdrawal.js');

describe('withdrawal', () => {
  let date = new Date();
  let withdrawal;

  describe('valid withdrawals', () => {
    it('allows you to withdraw a valid amount', () => {
      function isValidAmount() {
        return true;
      }
      const details = { date, amount: 3000, balance: 3000 };

      expect(() => {
        withdrawal = new Withdrawal(details, isValidAmount);
      }).not.toThrow();
    });
  });

  describe('invalid withdrawals', () => {
    it('refuses a withdrawal when the amount is invalid', () => {
      function isValidAmount() {
        return false;
      }
      const details = { date, amount: 0, balance: 0 };

      expect(() => {
        withdrawal = new Withdrawal(details, isValidAmount);
      }).toThrow(new Error('Unable to make withdrawal - amount is invalid'));
    });
  });

  it('refuses a withdrawal with funds are unavailable', () => {
    function isValidAmount() {
      return true;
    }
    const details = { date, amount: 200, balance: 0 };

    expect(() => {
      withdrawal = new Withdrawal(details, isValidAmount);
    }).toThrow(new Error('Unable to make withdrawal - insufficient funds'));
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

    it('prints the line for the withdrawal', () => {
      withdrawal = new Withdrawal({ date, amount: 3000, balance: 4000 });

      expect(withdrawal.printStatementLine()).toEqual(
        `${dateString} || || 3000.00 || 1000.00`
      );
    });

    it('prints the line for a decimal withdrawal', () => {
      withdrawal = new Withdrawal({ date, amount: 3000.12, balance: 4000 });

      expect(withdrawal.printStatementLine()).toEqual(
        `${dateString} || || 3000.12 || 999.88`
      );
    });
  });
});
