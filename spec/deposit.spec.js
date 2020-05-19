const Deposit = require('../src/deposit.js');

describe('Deposit', () => {
  let deposit;
  const date = new Date();

  it('allows you to deposit 1000 pounds', () => {
    expect(() => { deposit = new Deposit(date, 3000, 0); }).not.toThrow();
  });

  describe('errors', () => {
    it('refuses deposits unless they are positive', () => {
      expect(() => { deposit = new Deposit(date, 0, 0); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });

    it('refuses deposits with too many decimal places', () => {
      expect(() => { deposit = new Deposit(date, 100.321, 0); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });

    it('refuses deposits that arent numbers', () => {
      expect(() => { deposit = new Deposit(date, 'not a number', 0); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });

    it('refuses deposits that are numbers as strings', () => {
      expect(() => { deposit = new Deposit(date, '100', 0); }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });
  });
});
