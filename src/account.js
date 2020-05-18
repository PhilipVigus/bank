const todayAsString = require('./todayAsString.js');

function Account() {
  const accountActions = [];
  let balance = 0;
  const STATEMENT_HEADER = 'date || credit || debit || balance';

  function accountActionsToStatementString() {
    const statement = accountActions.map((action) => {
      if (action.type === 'deposit') {
        return `${todayAsString()} || ${action.amount.toFixed(2)} || || ${action.balance.toFixed(2)}`;
      } else {
        return `${todayAsString()} || || ${action.amount.toFixed(2)} || ${action.balance.toFixed(2)}`;
      }
    }).join('\n');

    return statement;
  }

  this.printStatement = function printStatement() {
    if (accountActions.length === 0) {
      return STATEMENT_HEADER;
    }

    const statement = accountActionsToStatementString();
    return `${STATEMENT_HEADER}\n${statement}`;
  };

  this.deposit = function deposit(amount) {
    if (amount <= 0) {
      return 'Unable to make deposit - amount must be positive';
    }

    balance += amount;
    accountActions.push({ type: 'deposit', amount, balance });
    return `${amount} successfully deposited on ${todayAsString()}`;
  };

  this.withdraw = function withdraw(amount) {
    if (amount <= 0) {
      return 'Unable to make withdrawl - amount must be positive';
    }

    balance -= amount;
    accountActions.push({ type: 'withdraw', amount, balance });
    return `${amount} successfully withdrawn on ${todayAsString()}`;
  };
}

module.exports = Account;
