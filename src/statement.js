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

  static getDepositLine(deposit, balance) {
    const line = `${Statement.dateToString(
      deposit.date
    )} || ${deposit.amount.toFixed(2)} || || ${balance.toFixed(2)}`;
    return line;
  }

  static getWithdrawalLine(withdrawal, balance) {
    const line = `${Statement.dateToString(
      withdrawal.date
    )} || || ${withdrawal.amount.toFixed(2)} || ${balance.toFixed(2)}`;
    return line;
  }

  transactionsToStatementString() {
    let runningBalance = 0;
    const statementLines = this.transactions.map((transaction) => {
      if (transaction.type === 'deposit') {
        runningBalance += transaction.amount;
        return Statement.getDepositLine(transaction, runningBalance);
      }

      runningBalance -= transaction.amount;
      return Statement.getWithdrawalLine(transaction, runningBalance);
    });

    return statementLines.reverse().join('\n');
  }

  print() {
    if (this.transactions.length === 0) {
      return this.STATEMENT_HEADER;
    }

    return `${this.STATEMENT_HEADER}\n${this.transactionsToStatementString()}`;
  }
}
