const Deposit = require('../src/deposit.js');

describe('Deposit', () => {
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

  it('allows you to deposit 1000 pounds', () => {
    let deposit;
    const details = { date, amount: 3000, balance: 0 };
    expect(() => { deposit = new Deposit(details); }).not.toThrow();
  });

  describe('errors', () => {
    let deposit;
    it('refuses deposits unless they are positive', () => {
      const details = { date, amount: 0, balance: 0 };
      expect(() => { deposit = new Deposit(details); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });

    it('refuses deposits with too many decimal places', () => {
      const details = { date, amount: 100.321, balance: 0 };
      expect(() => { deposit = new Deposit(details); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });

    it('refuses deposits that arent numbers', () => {
      const details = { date, amount: 'not a number', balance: 0 };
      expect(() => { deposit = new Deposit(details); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });

    it('refuses deposits that are numbers as strings', () => {
      const details = { date, amount: '100', balance: 0 };
      expect(() => { deposit = new Deposit(details); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });
  });

  describe('.printStatementLine', () => {
    it('prints the line for the deposit', () => {
      const deposit = new Deposit({ date, amount: 3000, balance: 0 });
      expect(deposit.printStatementLine()).toEqual(`${dateString} || 3000.00 || || 3000.00`);
    });

    it('prints the line for a decimal deposit', () => {
      const deposit = new Deposit({ date, amount: 3000.12, balance: 0 });
      expect(deposit.printStatementLine()).toEqual(`${dateString} || 3000.12 || || 3000.12`);
    });
  });
});
