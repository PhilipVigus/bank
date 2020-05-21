import Statement from './statement';
import Transaction from './transaction';

export default class AccountNew {
  constructor() {
    this.transactions = [];
    this.balance = 0;
  }

  addDeposit(amount, TransactionClass = Transaction) {
    // throws error if deposit is invalid
    const deposit = new TransactionClass(new Date(), amount, 'deposit');
    this.balance += amount;
    this.transactions.push(deposit);
    return `${amount.toFixed(2)} successfully deposited`;
  }

  addWithdrawal(amount, TransactionClass = Transaction) {
    // throws error if withdrawal is invalid
    const withdrawal = new TransactionClass(new Date(), amount, 'withdrawal');
    this.balance -= amount;
    this.transactions.push(withdrawal);
    return `${amount.toFixed(2)} successfully withdrawn`;
  }

  checkAvailableFunds(amount) {
    if (amount > this.balance) {
      throw new Error('Unable to make withdrawal - insufficient funds');
    }
  }

  deposit(amount) {
    try {
      return this.addDeposit(amount);
    } catch (error) {
      return error.message;
    }
  }

  withdraw(amount) {
    try {
      this.checkAvailableFunds(amount);
      return this.addWithdrawal(amount);
    } catch (error) {
      return error.message;
    }
  }

  printStatement(StatementClass = Statement) {
    const statement = new StatementClass(this.transactions);
    return statement.print();
  }
}
