const Withdrawl = require('../src/withdrawl.js');

describe('Withdrawl', () => {
  let withdrawl;
  const date = new Date();

  it('can be created with a positive amount 1000 pounds', () => {
    expect(() => { withdrawl = new Withdrawl(date, 3000, 3000); }).not.toThrow();
  });

  describe('errors', () => {
    it('refuses withdrawls unless they are positive', () => {
      expect(() => { withdrawl = new Withdrawl(date, 0, 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls if you have insufficient funds', () => {
      expect(() => { withdrawl = new Withdrawl(date, 1000, 100); }).toThrow(new Error('Unable to make withdrawl - insufficient funds'));
    });

    it('refuses withdrawls with too many decimal places', () => {
      expect(() => { withdrawl = new Withdrawl(date, 100.321, 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls that arent numbers', () => {
      expect(() => { withdrawl = new Withdrawl(date, 'not a number', 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls that are numbers as strings', () => {
      expect(() => { withdrawl = new Withdrawl(date, '200', 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });
  });
});
