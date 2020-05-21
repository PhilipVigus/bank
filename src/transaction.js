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

  dateToString() {
    const day = String(this.date.getDate()).padStart(2, '0');
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const year = this.date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
