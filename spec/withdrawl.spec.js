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

  describe('errors', () => {
    let withdrawl;

    it('refuses withdrawls unless they are positive', () => {
      const details = { date, amount: 0, balance: 3000 };
      expect(() => { withdrawl = new Withdrawl(details); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls if you have insufficient funds', () => {
      const details = { date, amount: 3000, balance: 100 };
      expect(() => { withdrawl = new Withdrawl(details); }).toThrow(new Error('Unable to make withdrawl - insufficient funds'));
    });

    it('refuses withdrawls with too many decimal places', () => {
      const details = { date, amount: 100.321, balance: 3000 };
      expect(() => { withdrawl = new Withdrawl(details); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls that arent numbers', () => {
      const details = { date, amount: 'not a number', balance: 3000 };
      expect(() => { withdrawl = new Withdrawl(details); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls that are numbers as strings', () => {
      const details = { date, amount: '3000', balance: 3000 };
      expect(() => { withdrawl = new Withdrawl(details); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });
  });

  describe('.printStatementLine', () => {
    it('prints the line for the withdrawl', () => {
      const withdrawl = new Withdrawl({ date, amount: 3000, balance: 4000 });
      expect(withdrawl.printStatementLine()).toEqual(`${dateString} || || 3000.00 || 1000.00`);
    });
  });
});
