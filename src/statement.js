export default function Statement(accountTransactions = []) {
  const STATEMENT_HEADER = 'date || credit || debit || balance';
  const transactions = accountTransactions;

  function dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function accountActionsToStatementString() {
    let runningBalance = 0;
    const statementLines = transactions.map((transaction) => {
      if (transaction.type === 'deposit') {
        runningBalance += transaction.amount;
        const line = `${dateToString(
          transaction.date
        )} || ${transaction.amount.toFixed(2)} || || ${runningBalance.toFixed(
          2
        )}`;
        return line;
      }

      runningBalance -= transaction.amount;
      const line = `${dateToString(
        transaction.date
      )} || || ${transaction.amount.toFixed(2)} || ${runningBalance.toFixed(
        2
      )}`;
      return line;
    });

    return statementLines.reverse().join('\n');
  }

  this.print = function print() {
    if (transactions.length === 0) {
      return STATEMENT_HEADER;
    }

    return `${STATEMENT_HEADER}\n${accountActionsToStatementString()}`;
  };
}
