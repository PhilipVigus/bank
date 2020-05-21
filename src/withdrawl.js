const isValidAmountFunction = require('./isValidAmount.js');

function Withdrawl(withdrawlDetails, isValidAmount = isValidAmountFunction) {
  function validateAvailableFunds() {
    if (withdrawlDetails.amount > withdrawlDetails.balance) {
      throw new Error('Unable to make withdrawl - insufficient funds');
    }
  }

  function validateAmount() {
    if (!isValidAmount(withdrawlDetails.amount)) {
      throw new Error('Unable to make withdrawl - amount is invalid');
    }
  }

  function validateWithdrawl() {
    validateAmount();
    validateAvailableFunds();
  }

  function dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  this.printStatementLine = function printStatementLine() {
    return `${dateToString(this.date)} || || ${this.amount.toFixed(
      2
    )} || ${this.balanceAfterWithdrawl.toFixed(2)}`;
  };

  validateWithdrawl();

  this.type = 'withdrawl';
  this.date = withdrawlDetails.date;
  this.amount = withdrawlDetails.amount;
  this.balanceAfterWithdrawl =
    withdrawlDetails.balance - withdrawlDetails.amount;
}

module.exports = Withdrawl;
