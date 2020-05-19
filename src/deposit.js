function Deposit(depositDate, depositAmount, balanceBeforeDeposit) {
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

  function validateAmount() {
    if (isAmountInvalid(depositAmount)) {
      throw new Error('Unable to make deposit - amount is invalid');
    }
  }

  function validateDeposit() {
    validateAmount();
  }

  validateDeposit();

  this.type = 'deposit';
  this.date = depositDate;
  this.amount = depositAmount;
  this.balanceAfterDeposit = balanceBeforeDeposit + depositAmount;
}

module.exports = Deposit;
