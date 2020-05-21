import isValidAmount from './isValidAmount.js';

export default class Transaction {
  constructor(date, amount, type) {
    this.type = type;
    this.date = date;
    this.amount = amount;
    this.validateTransaction(this.amount);
  }

  validateTransaction(amount) {
    this.validateAmount(amount);
  }

  validateAmount(amount) {
    if (!isValidAmount(amount)) {
      throw new Error(`Unable to make ${this.type} - amount is invalid`);
    }
  }
}
