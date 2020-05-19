const isValidAmountFunction = require('./isValidAmount.js');

function Deposit(depositDetails, isValidAmount = isValidAmountFunction) {
  function validateAmount() {
    if (!isValidAmount(depositDetails.amount)) {
      throw new Error('Unable to make deposit - amount is invalid');
    }
  }

  function validateDeposit() {
    validateAmount();
  }

  function dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  this.printStatementLine = function printStatementLine() {
    return `${dateToString(this.date)} || ${this.amount.toFixed(2)} || || ${this.balanceAfterDeposit.toFixed(2)}`;
  };

  validateDeposit();

  this.type = 'deposit';
  this.date = depositDetails.date;
  this.amount = depositDetails.amount;
  this.balanceAfterDeposit = depositDetails.balance + depositDetails.amount;
}

module.exports = Deposit;
