const Withdrawl = require('../src/withdrawl.js');

describe('Withdrawl', () => {
  let withdrawl;
  const date = new Date();

  it('can be created with a positive amount 1000 pounds', () => {
    const details = { date, amount: 3000, balance: 3000 };
    expect(() => { withdrawl = new Withdrawl(details); }).not.toThrow();
  });

  describe('errors', () => {
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
});
