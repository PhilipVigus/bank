const isValidAmountFunction = require('./isValidAmount.js');

function Deposit(depositDate, depositAmount, balanceBeforeDeposit, isValidAmount = isValidAmountFunction) {
  function validateAmount() {
    if (!isValidAmount(depositAmount)) {
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
