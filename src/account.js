import Statement from './statement.js';
import Transaction from './transaction.js';
import TransactionList from './transactionList.js';

export default class Account {
  constructor() {
    this.transactionList = [];
    this.newTransactionList = new TransactionList();
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
      this.newTransactionList.add(deposit);
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
      this.newTransactionList.add(withdrawal);
      return `${amount.toFixed(2)} successfully withdrawn`;
    } catch (error) {
      return error.message;
    }
  }

  printStatement(StatementClass = Statement) {
    const statement = new StatementClass(this.newTransactionList);
    return statement.print();
  }
}
