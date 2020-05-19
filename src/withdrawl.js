const isValidAmountFunction = require('./isValidAmount.js');

function Withdrawl(withdrawlDate, withdrawlAmount, balanceBeforeWithdrawl, isValidAmount = isValidAmountFunction) {
  function validateAvailableFunds() {
    if (withdrawlAmount > balanceBeforeWithdrawl) {
      throw new Error('Unable to make withdrawl - insufficient funds');
    }
  }

  function validateAmount() {
    if (!isValidAmount(withdrawlAmount)) {
      throw new Error('Unable to make withdrawl - amount is invalid');
    }
  }

  function validateWithdrawl() {
    validateAmount();
    validateAvailableFunds();
  }

  validateWithdrawl();

  this.type = 'withdrawl';
  this.date = withdrawlDate;
  this.amount = withdrawlAmount;
  this.balanceAfterWithdrawl = balanceBeforeWithdrawl - withdrawlAmount;
}

module.exports = Withdrawl;
