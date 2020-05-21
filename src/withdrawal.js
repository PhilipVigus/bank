import isValidAmount from './isValidAmount';

export default function Withdrawal(withdrawalDetails, isValid = isValidAmount) {
  function validateAvailableFunds() {
    if (withdrawalDetails.amount > withdrawalDetails.balance) {
      throw new Error('Unable to make withdrawal - insufficient funds');
    }
  }

  function validateAmount() {
    if (!isValid(withdrawalDetails.amount)) {
      throw new Error('Unable to make withdrawal - amount is invalid');
    }
  }

  function validateWithdrawal() {
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
    )} || ${this.balanceAfterWithdrawal.toFixed(2)}`;
  };

  validateWithdrawal();

  this.type = 'withdrawal';
  this.date = withdrawalDetails.date;
  this.amount = withdrawalDetails.amount;
  this.balanceAfterWithdrawal =
    withdrawalDetails.balance - withdrawalDetails.amount;
}
