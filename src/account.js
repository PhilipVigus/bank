import Statement from './statement';
import Deposit from './deposit';
import Withdrawal from './withdrawal';

export default function Account(
  transactionTypes = {
    Deposit,
    Withdrawal,
  }
) {
  const transactions = [];
  let balance = 0;

  function addDeposit(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if deposit is invalid
    const deposit = new transactionTypes.Deposit(details);
    balance += amount;
    transactions.push(deposit);
    return `${amount.toFixed(2)} successfully deposited`;
  }

  function addWithdrawal(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if withdrawal is invalid
    const withdrawal = new transactionTypes.Withdrawal(details);
    balance -= amount;
    transactions.push(withdrawal);
    return `${amount.toFixed(2)} successfully withdrawn`;
  }

  this.deposit = function deposit(amount) {
    try {
      return addDeposit(amount);
    } catch (error) {
      return error.message;
    }
  };

  this.withdraw = function withdraw(amount) {
    try {
      return addWithdrawal(amount);
    } catch (error) {
      return error.message;
    }
  };

  this.printStatement = function printStatement(St = Statement) {
    const statement = new St(transactions);
    return statement.print();
  };
}
