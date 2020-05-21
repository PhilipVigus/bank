function Statement(statementTransactions = []) {
  const STATEMENT_HEADER = 'date || credit || debit || balance';
  const transactions = statementTransactions;

  function accountActionsToStatementString() {
    const statementLines = transactions.map((transaction) =>
      transaction.printStatementLine()
    );
    return statementLines.reverse().join('\n');
  }

  this.print = function print() {
    if (transactions.length === 0) {
      return STATEMENT_HEADER;
    }

    return `${STATEMENT_HEADER}\n${accountActionsToStatementString()}`;
  };
}

module.exports = Statement;
