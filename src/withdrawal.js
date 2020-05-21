const isValidAmountFunction = require('./isValidAmount.js');

function Withdrawal(withdrawalDetails, isValidAmount = isValidAmountFunction) {
  function validateAvailableFunds() {
    if (withdrawalDetails.amount > withdrawalDetails.balance) {
      throw new Error('Unable to make withdrawal - insufficient funds');
    }
  }

  function validateAmount() {
    if (!isValidAmount(withdrawalDetails.amount)) {
      throw new Error('Unable to make withdrawal - amount is invalid');
    }
  }

  function validatewithdrawal() {
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
    )} || ${this.balanceAfterwithdrawal.toFixed(2)}`;
  };

  validatewithdrawal();

  this.type = 'withdrawal';
  this.date = withdrawalDetails.date;
  this.amount = withdrawalDetails.amount;
  this.balanceAfterwithdrawal =
    withdrawalDetails.balance - withdrawalDetails.amount;
}

module.exports = Withdrawal;
