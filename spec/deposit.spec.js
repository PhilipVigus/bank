const Deposit = require('../src/deposit.js');

describe('Deposit', () => {
  let deposit;
  const date = new Date();

  it('allows you to deposit 1000 pounds', () => {
    const details = { date, amount: 3000, balance: 0 };
    expect(() => { deposit = new Deposit(details); }).not.toThrow();
  });

  describe('errors', () => {
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
});
