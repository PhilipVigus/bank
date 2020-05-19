const Withdrawl = require('../src/withdrawl.js');

describe('Withdrawl', () => {
  let date;
  let dateString;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock.mockDate;

    date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    dateString = `${day}/${month}/${year}`;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('can be created with a positive amount 1000 pounds', () => {
    let withdrawl;
    const details = { date, amount: 3000, balance: 3000 };
    expect(() => { withdrawl = new Withdrawl(details); }).not.toThrow();
  });

  describe('.printStatementLine', () => {
    it('prints the line for the withdrawl', () => {
      const withdrawl = new Withdrawl({ date, amount: 3000, balance: 4000 });
      expect(withdrawl.printStatementLine()).toEqual(`${dateString} || || 3000.00 || 1000.00`);
    });

    it('prints the line for a decimal withdrawl', () => {
      const withdrawl = new Withdrawl({ date, amount: 3000.12, balance: 4000 });
      expect(withdrawl.printStatementLine()).toEqual(`${dateString} || || 3000.12 || 999.88`);
    });
  });
});
