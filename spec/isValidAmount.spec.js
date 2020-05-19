const isValidAmount = require('../src/isValidAmount.js');

describe('isValidAmount', () => {
  it('returns true if the amount is valid', () => {
    expect(isValidAmount(1000)).toEqual(true);
  });

  it('returns false if the amount is not positive', () => {
    expect(isValidAmount(0)).toEqual(false);
  });

  it('returns false if the amount has too many decimal places', () => {
    expect(isValidAmount(1000.123)).toEqual(false);
  });

  it('returns false if the amount is not a number', () => {
    expect(isValidAmount('not a number')).toEqual(false);
  });

  it('returns false if the amount is a number string', () => {
    expect(isValidAmount('1000')).toEqual(false);
  });

  it('returns false if the amount is undefined', () => {
    expect(isValidAmount()).toEqual(false);
  });
});
