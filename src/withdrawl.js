function Withdrawl(withdrawlDate, withdrawlAmount, balanceBeforeWithdrawl) {
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

  function isAmountInvalid(amount) {
    return (amount === undefined)
      || isNotNumber(amount)
      || hasTooManyDecimals(amount)
      || (amount === 0);
  }

  function validateAvailableFunds() {
    if (withdrawlAmount > balanceBeforeWithdrawl) {
      throw new Error('Unable to make withdrawl - insufficient funds');
    }
  }

  function validateAmount() {
    if (isAmountInvalid(withdrawlAmount)) {
      throw new Error('Unable to make withdrawl - amount is invalid');
    }
  }

  function validateWithdrawl() {
    validateAmount();
    validateAvailableFunds();
  }

  validateWithdrawl();

  this.date = withdrawlDate;
  this.amount = withdrawlAmount;
  this.balanceBeforeWithdrawl = balanceBeforeWithdrawl;
}

module.exports = Withdrawl;
