const todayAsStringModuleFunction = require('./todayAsString.js');

function StatementPrinter(actions, todayAsString = todayAsStringModuleFunction) {
  const STATEMENT_HEADER = 'date || credit || debit || balance';
  const accountActions = actions;

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
}

module.exports = StatementPrinter;
