const StatementFunction = require('./statement.js');
const Deposit = require('./deposit.js');
const Withdrawl = require('./withdrawl.js');

function Account() {
  const transactions = [];
  let balance = 0;

  function addDeposit(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if deposit is invalid
    const deposit = new Deposit(details);
    balance += amount;
    transactions.push(deposit);
    return `${amount} successfully deposited`;
  }

  function addWithdrawl(amount) {
    const details = { date: new Date(), amount, balance };
    // throws error if withdrawl is invalid
    const withdrawl = new Withdrawl(details);
    balance -= amount;
    transactions.push(withdrawl);
    return `${amount} successfully withdrawn`;
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
      return addWithdrawl(amount);
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
