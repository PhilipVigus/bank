const StatementFunction = require('./statement.js');
const DepositFunction = require('./deposit.js');
const withdrawalFunction = require('./withdrawal.js');

function Account(
  transactionTypes = {
    Deposit: DepositFunction,
    withdrawal: withdrawalFunction,
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

  function addwithdrawal(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if withdrawal is invalid
    const withdrawal = new transactionTypes.withdrawal(details);
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
      return addwithdrawal(amount);
    } catch (error) {
      return error.message;
    }
  };

  this.printStatement = function printStatement(Statement = StatementFunction) {
    const statement = new Statement(transactions);
    return statement.print();
  };
}

module.exports = Account;
