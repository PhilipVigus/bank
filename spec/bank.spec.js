const Bank = require('../src/bank.js');

describe('Bank', () => {
  function currentDateString() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  let bank;
  beforeEach(() => {
    bank = new Bank();
    jasmine.clock().install();
    jasmine.clock.mockDate;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('.printStatement', () => {
    it('prints a blank statement', () => {
      expect(bank.printStatement()).toEqual('date || credit || debit || balance');
    });

    it('shows a deposit', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${currentDateString()} || 2000.00 || || 2000.00`;

      bank.deposit(2000);
      expect(bank.printStatement()).toEqual(expectedOutput);
    });

    it('shows multiple deposits', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${currentDateString()} || 1000.00 || || 1000.00\n`
        + `${currentDateString()} || 2000.00 || || 3000.00`;

      bank.deposit(1000);
      bank.deposit(2000);
      expect(bank.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 1000', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${currentDateString()} || || 1000.00 || -1000.00`;

      bank.withdraw(1000);
      expect(bank.printStatement()).toEqual(expectedOutput);
    });

    it('shows a withdrawl of 2000', () => {
      const expectedOutput = 'date || credit || debit || balance\n'
        + `${currentDateString()} || || 2000.00 || -2000.00`;

      bank.withdraw(2000);
      expect(bank.printStatement()).toEqual(expectedOutput);
    });
  });

  describe('.deposit', () => {
    it('allows you to deposit 1000 pounds', () => {
      expect(bank.deposit(1000)).toEqual(`1000 successfully deposited on ${currentDateString()}`);
    });

    it('allows you to deposit 2000 pounds', () => {
      expect(bank.deposit(2000)).toEqual(`2000 successfully deposited on ${currentDateString()}`);
    });

    it('refuses deposits unless they are positive', () => {
      expect(bank.deposit(0)).toEqual('Unable to make deposit - amount must be positive');
    });
  });

  describe('.withdraw', () => {
    it('allows you to withdraw 1000 pounds', () => {
      expect(bank.withdraw(1000)).toEqual(`1000 successfully withdrawn on ${currentDateString()}`);
    });

    it('allows you to withdraw 2000 pounds', () => {
      expect(bank.withdraw(2000)).toEqual(`2000 successfully withdrawn on ${currentDateString()}`);
    });

    it('refuses withdrawls unless they are positive', () => {
      expect(bank.withdraw(0)).toEqual('Unable to make withdrawl - amount must be positive');
    });
  });
});
