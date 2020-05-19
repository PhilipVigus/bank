function Withdrawl(amount, balance) {
  function hasTooManyDecimals(number) {
    let numberOfDecimals = 0;

    if (Math.floor(number) !== number) {
      const decimalPart = number.toString().split('.')[1];
      numberOfDecimals = decimalPart.length || 0;
    }

    return numberOfDecimals > 2;
  }

  function isNotNumber(value) {
    /**
     * ^[-]?\d+(\.\d+)?$
     *
     * ^ - anchor to start
     * [-]? - optional minus sign
     * \d+ - one or more digits
     * (\.\d+) - a decimal point followed by one or more digits
     * ? - decimal part is optional
     * $ - anchor to end
     */
    return value.toString().match(/^[-]?\d+(\.\d+)?$/) === null
      || typeof value !== 'number';
  }

  if (isNotNumber(amount)) {
    throw new Error('Unable to make withdrawl - amount is invalid');
  }

  if (amount <= 0) {
    throw new Error('Unable to make withdrawl - amount is invalid');
  }

  if (amount > balance) {
    throw new Error('Unable to make withdrawl - insufficient funds');
  }

  if (hasTooManyDecimals(amount)) {
    throw new Error('Unable to make withdrawl - amount is invalid');
  }
}

module.exports = Withdrawl;
