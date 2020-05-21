import isValidAmount from './isValidAmount';

export default class Transaction {
  constructor(details, type) {
    this.type = type;
    this.date = details.date;
    this.amount = details.amount;
    this.validateTransaction(details.amount);
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
