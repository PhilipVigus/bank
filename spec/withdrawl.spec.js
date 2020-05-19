const Withdrawl = require('../src/withdrawl.js');

describe('Withdrawl', () => {
  let withdrawl;

  it('can be created with a positive amount 1000 pounds', () => {
    expect(() => { withdrawl = new Withdrawl(3000, 3000); }).not.toThrow();
  });

  describe('errors', () => {
    it('refuses withdrawls unless they are positive', () => {
      expect(() => { withdrawl = new Withdrawl(0, 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls if you have insufficient funds', () => {
      expect(() => { withdrawl = new Withdrawl(1000, 100); }).toThrow(new Error('Unable to make withdrawl - insufficient funds'));
    });

    it('refuses withdrawls with too many decimal places', () => {
      expect(() => { withdrawl = new Withdrawl(100.321, 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls that arent numbers', () => {
      expect(() => { withdrawl = new Withdrawl('not a number', 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });

    it('refuses withdrawls that are numbers as strings', () => {
      expect(() => { withdrawl = new Withdrawl('200', 3000); }).toThrow(new Error('Unable to make withdrawl - amount is invalid'));
    });
  });
});
