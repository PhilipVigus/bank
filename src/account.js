const StatementFunction = require('./statement.js');
const Deposit = require('./deposit.js');
const Withdrawl = require('./withdrawl.js');

function Account() {
  const transactions = [];
  let balance = 0;

  function isNotNumber(amount) {
    /**
     * ^[-]?\d+(\.\d+)?$
     *
     * ^ - anchor to start
     * [-]? - optional minus sign
     * \d+ - one or more digits
     * (\.\d+) - a decimal point followed by one or more digits
     * ? - decimal part is optional
     * $ - anchor to end
     */
    return amount.toString().match(/^[-]?\d+(\.\d+)?$/) === null
      || typeof amount !== 'number';
  }

  function hasTooManyDecimals(amount) {
    let numberOfDecimals = 0;

    if (Math.floor(amount) !== amount) {
      const decimalPart = amount.toString().split('.')[1];
      numberOfDecimals = decimalPart.length || 0;
    }

    return numberOfDecimals > 2;
  }

  function isAmountInvalid(amount) {
    return (amount === undefined)
      || isNotNumber(amount)
      || hasTooManyDecimals(amount)
      || (amount === 0);
  }

  function validateDeposit(amount) {
    if (isAmountInvalid(amount)) {
      throw new Error('Unable to make deposit - amount is invalid');
    }
  }

  function validateWithdrawl(amount) {
    if (isAmountInvalid(amount)) {
      throw new Error('Unable to make withdrawl - amount is invalid');
    }

    if (amount > balance) {
      throw new Error('Unable to make withdrawl - insufficient funds');
    }
  }

  this.deposit = function deposit(amount) {
    try {
      const deposit = new Deposit(new Date(), amount, balance);
      balance += amount;
      transactions.push(deposit);
      return `${amount} successfully deposited`;
    } catch (error) {
      return error.message;
    }
  };

  this.withdraw = function withdraw(amount) {
    try {
      const withdrawl = new Withdrawl(new Date(), amount, balance);
      balance -= amount;
      transactions.push(withdrawl);
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
