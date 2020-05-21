export default class Statement {
  constructor(accountTransactions = []) {
    this.STATEMENT_HEADER = 'date || credit || debit || balance';
    this.transactions = accountTransactions;
  }

  static dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  accountActionsToStatementString() {
    let runningBalance = 0;
    const statementLines = this.transactions.map((transaction) => {
      if (transaction.type === 'deposit') {
        runningBalance += transaction.amount;
        const line = `${Statement.dateToString(
          transaction.date
        )} || ${transaction.amount.toFixed(2)} || || ${runningBalance.toFixed(
          2
        )}`;
        return line;
      }

      runningBalance -= transaction.amount;
      const line = `${Statement.dateToString(
        transaction.date
      )} || || ${transaction.amount.toFixed(2)} || ${runningBalance.toFixed(
        2
      )}`;
      return line;
    });

    return statementLines.reverse().join('\n');
  }

  print() {
    if (this.transactions.length === 0) {
      return this.STATEMENT_HEADER;
    }

    return `${
      this.STATEMENT_HEADER
    }\n${this.accountActionsToStatementString()}`;
  }
}
