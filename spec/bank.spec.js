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
  });

  it('prints a blank statement', () => {
    expect(bank.printStatement()).toEqual('date || credit || debit || balance');
  });

  describe('.deposit', () => {
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock.mockDate;
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('allows you to deposit 1000 pounds', () => {
      expect(bank.deposit(1000)).toEqual(`1000 successfully deposited on ${currentDateString()}`);
    });

    it('allows you to deposit 2000 pounds', () => {
      expect(bank.deposit(2000)).toEqual(`2000 successfully deposited on ${currentDateString()}`);
    });
  });
});
