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

  validateDeposit();

  this.type = 'deposit';
  this.date = depositDetails.date;
  this.amount = depositDetails.amount;
  this.balanceAfterDeposit = depositDetails.balance + depositDetails.amount;
}

module.exports = Deposit;
