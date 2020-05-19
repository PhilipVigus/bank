const StatementFunction = require('./statement.js');

function Account() {
  const history = [];
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

  this.deposit = function deposit(amount) {
    if (isNotNumber(amount)) {
      return 'Unable to make deposit - amount is not a number';
    }

    if (amount <= 0) {
      return 'Unable to make deposit - amount must be positive';
    }

    if (hasTooManyDecimals(amount)) {
      return 'Unable to make deposit - amount has too many decimal places';
    }

    balance += amount;
    history.push({
      type: 'deposit',
      date: new Date(),
      amount,
      balance,
    });

    return `${amount} successfully deposited`;
  };

  this.withdraw = function withdraw(amount) {
    if (isNotNumber(amount)) {
      return 'Unable to make withdrawl - amount is not a number';
    }

    if (amount <= 0) {
      return 'Unable to make withdrawl - amount must be positive';
    }

    if (amount > balance) {
      return 'Unable to make withdrawl - insufficient funds';
    }

    if (hasTooManyDecimals(amount)) {
      return 'Unable to make withdrawl - amount has too many decimal places';
    }

    balance -= amount;

    history.push({
      type: 'withdraw',
      date: new Date(),
      amount,
      balance,
    });

    return `${amount} successfully withdrawn`;
  };

  this.printStatement = function printStatement(Statement = StatementFunction) {
    const statement = new Statement(history);
    return statement.printStatement();
  };
}

module.exports = Account;
