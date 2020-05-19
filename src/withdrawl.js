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

  validateWithdrawl();

  this.type = 'withdrawl';
  this.date = withdrawlDetails.date;
  this.amount = withdrawlDetails.amount;
  this.balanceAfterWithdrawl = withdrawlDetails.balance - withdrawlDetails.amount;
}

module.exports = Withdrawl;
