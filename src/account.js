const StatementFunction = require('./statement.js');
const Deposit = require('./deposit.js');
const Withdrawl = require('./withdrawl.js');

function Account() {
  const transactions = [];
  let balance = 0;

  function addDeposit(amount) {
    // throws if deposit is invalid
    const deposit = new Deposit(new Date(), amount, balance);
    balance += amount;
    transactions.push(deposit);
  }

  function addWithdrawl(amount) {
    // throws if withdrawl is invalid
    const withdrawl = new Withdrawl(new Date(), amount, balance);
    balance -= amount;
    transactions.push(withdrawl);
  }

  this.deposit = function deposit(amount) {
    try {
      addDeposit(amount);
      return `${amount} successfully deposited`;
    } catch (error) {
      return error.message;
    }
  };

  this.withdraw = function withdraw(amount) {
    try {
      addWithdrawl(amount);
      return `${amount} successfully withdrawn`;
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
