import Statement from './statement';
import Transaction from './transaction';

export default function Account() {
  const transactions = [];
  let balance = 0;

  function addDeposit(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if deposit is invalid
    // const deposit = new transactionTypes.Deposit(details);
    const deposit = new Transaction(details, 'deposit');
    balance += amount;
    transactions.push(deposit);
    return `${amount.toFixed(2)} successfully deposited`;
  }

  function addWithdrawal(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if withdrawal is invalid
    const withdrawal = new Transaction(details, 'withdrawal');
    balance -= amount;
    transactions.push(withdrawal);
    return `${amount.toFixed(2)} successfully withdrawn`;
  }

  function checkAvailableFunds(amount) {
    if (amount > balance) {
      throw new Error('Unable to make withdrawal - insufficient funds');
    }
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
      checkAvailableFunds(amount);
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
