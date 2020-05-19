function Statement(statementTransactions = []) {
  const STATEMENT_HEADER = 'date || credit || debit || balance';
  const transactions = statementTransactions;

  function dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function depositStatementLine(date, amount, lineBalance) {
    return `${dateToString(date)} || ${amount.toFixed(2)} || || ${lineBalance.toFixed(2)}`;
  }

  function withdrawlStatementLine(date, amount, lineBalance) {
    return `${dateToString(date)} || || ${amount.toFixed(2)} || ${lineBalance.toFixed(2)}`;
  }

  function getStatementLine(transaction) {
    if (transaction.type === 'deposit') {
      return depositStatementLine(transaction.date, transaction.amount, transaction.balanceAfterDeposit);
    } else {
      return withdrawlStatementLine(transaction.date, transaction.amount, transaction.balanceAfterWithdrawl);
    }
  }

  function accountActionsToStatementString() {
    const actionsInReverseOrder = transactions.reverse();
    const statementLines = actionsInReverseOrder.map((action) => {
      return getStatementLine(action);
    });

    return statementLines.join('\n');
  }

  this.print = function print() {
    if (transactions.length === 0) {
      return STATEMENT_HEADER;
    }

    return `${STATEMENT_HEADER}\n${accountActionsToStatementString()}`;
  };
}

module.exports = Statement;
