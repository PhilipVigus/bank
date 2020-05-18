const todayAsStringModuleFunction = require('./todayAsString.js');

function Account(todayAsString = todayAsStringModuleFunction) {
  const accountActions = [];
  let balance = 0;
  const STATEMENT_HEADER = 'date || credit || debit || balance';

  function depositStatementLine(amount, lineBalance) {
    return `${todayAsString()} || ${amount.toFixed(2)} || || ${lineBalance.toFixed(2)}`;
  }

  function withdrawlStatementLine(amount, lineBalance) {
    return `${todayAsString()} || || ${amount.toFixed(2)} || ${lineBalance.toFixed(2)}`;
  }

  function accountActionsToStatementString() {
    const statement = accountActions.map((action) => {
      if (action.type === 'deposit') {
        return depositStatementLine(action.amount, action.balance);
      } else {
        return withdrawlStatementLine(action.amount, action.balance);
      }
    }).join('\n');

    return statement;
  }

  this.printStatement = function printStatement() {
    if (accountActions.length === 0) {
      return STATEMENT_HEADER;
    }

    return `${STATEMENT_HEADER}\n${accountActionsToStatementString()}`;
  };

  function hasInvalidDecimals(amount) {
    let numberOfDecimals = 0;

    if (Math.floor(amount) !== amount) {
      const decimalPart = amount.toString().split('.')[1];
      numberOfDecimals = decimalPart.length || 0;
    }

    return numberOfDecimals > 2;
  }

  this.deposit = function deposit(amount) {
    if (amount <= 0) {
      return 'Unable to make deposit - amount must be positive';
    }

    if (hasInvalidDecimals(amount)) {
      return 'Unable to make deposit - amount has too many decimal places';
    }

    balance += amount;
    accountActions.unshift({ type: 'deposit', amount, balance });
    return `${amount} successfully deposited on ${todayAsString()}`;
  };

  this.withdraw = function withdraw(amount) {
    if (amount <= 0) {
      return 'Unable to make withdrawl - amount must be positive';
    }

    if (amount > balance) {
      return 'Unable to make withdrawl - insufficient funds';
    }

    if (hasInvalidDecimals(amount)) {
      return 'Unable to make withdrawl - amount has too many decimal places';
    }

    balance -= amount;
    accountActions.unshift({ type: 'withdraw', amount, balance });
    return `${amount} successfully withdrawn on ${todayAsString()}`;
  };
}

module.exports = Account;
