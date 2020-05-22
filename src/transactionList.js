export default class TransactionList {
  constructor() {
    this.transactions = [];
  }

  add(transaction) {
    this.transactions.push(transaction);
  }

  forEach(fn) {
    this.transactions.forEach((transaction) => {
      fn(transaction);
    });
  }

  isEmpty() {
    return this.transactions.length === 0;
  }
}
