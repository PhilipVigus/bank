const StatementFunction = require('./statement.js');

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

  function validateDeposit(amount) {
    const isAmountInvalid = (amount === undefined)
      || isNotNumber(amount)
      || hasTooManyDecimals(amount)
      || (amount === 0);

    if (isAmountInvalid) {
      throw new Error('Unable to make deposit - amount is invalid');
    }
  }

  function validateWithdrawl(amount) {
    const isAmountInvalid = (amount === undefined)
      || isNotNumber(amount)
      || hasTooManyDecimals(amount)
      || (amount === 0);

    if (isAmountInvalid) {
      throw new Error('Unable to make withdrawl - amount is invalid');
    }

    if (amount > balance) {
      throw new Error('Unable to make withdrawl - insufficient funds');
    }
  }

  this.deposit = function deposit(amount) {
    try {
      validateDeposit(amount);
    } catch (error) {
      return error.message;
    }

    balance += amount;
    transactions.push({ type: 'deposit', date: new Date(), amount, balance });
    return `${amount} successfully deposited`;
  };

  this.withdraw = function withdraw(amount) {
    try {
      validateWithdrawl(amount);
    } catch (error) {
      return error.message;
    }

    balance -= amount;
    transactions.push({ type: 'withdraw', date: new Date(), amount, balance });
    return `${amount} successfully withdrawn`;
  };

  this.printStatement = function printStatement(Statement = StatementFunction) {
    const statement = new Statement(transactions);
    return statement.print();
  };
}

module.exports = Account;
