const isValidAmountFunction = require('./isValidAmount.js');

function Deposit(details, isValidAmount = isValidAmountFunction) {
  function validateAmount() {
    if (!isValidAmount(details.amount)) {
      throw new Error('Unable to make deposit - amount is invalid');
    }
  }

  function validateDeposit() {
    validateAmount();
  }

  validateDeposit();

  this.type = 'deposit';
  this.date = details.date;
  this.amount = details.amount;
  this.balanceAfterDeposit = details.balance + details.amount;
}

module.exports = Deposit;
