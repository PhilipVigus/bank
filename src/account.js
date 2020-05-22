import Statement from './statement.js';
import Transaction from './transaction.js';

export default class Account {
  constructor() {
    this.transactionList = [];
    this.balance = 0;
  }

  checkAvailableFunds(amount) {
    if (amount > this.balance) {
      throw new Error('Unable to make withdrawal - insufficient funds');
    }
  }

  deposit(amount, TransactionClass = Transaction) {
    try {
      const deposit = new TransactionClass(new Date(), amount, 'deposit');
      this.balance += amount;
      this.transactionList.push(deposit);
      return `${amount.toFixed(2)} successfully deposited`;
    } catch (error) {
      return error.message;
    }
  }

  withdraw(amount, TransactionClass = Transaction) {
    try {
      this.checkAvailableFunds(amount);
      const withdrawal = new TransactionClass(new Date(), amount, 'withdrawal');
      this.balance -= amount;
      this.transactionList.push(withdrawal);
      return `${amount.toFixed(2)} successfully withdrawn`;
    } catch (error) {
      return error.message;
    }
  }

  printStatement(StatementClass = Statement) {
    const statement = new StatementClass(this.transactionList);
    return statement.print();
  }
}
