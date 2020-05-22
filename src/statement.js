export default class Statement {
  constructor(newTransactionList) {
    this.STATEMENT_HEADER = 'date || credit || debit || balance';
    this.newTransactions = newTransactionList;
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
    const lines = [];
    this.newTransactions.forEach((transaction) => {
      if (transaction.type === 'deposit') {
        runningBalance += transaction.amount;
        lines.push(Statement.getDepositLine(transaction, runningBalance));
      } else {
        runningBalance -= transaction.amount;
        lines.push(Statement.getWithdrawalLine(transaction, runningBalance));
      }
    });

    return lines.reverse().join('\n');
  }

  print() {
    if (this.newTransactions.isEmpty()) {
      return this.STATEMENT_HEADER;
    }

    return `${this.STATEMENT_HEADER}\n${this.transactionsToStatementString()}`;
  }
}
