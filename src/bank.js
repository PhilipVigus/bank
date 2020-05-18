function Bank() {
  let accountActions = [];
  let balance = 0;
  const STATEMENT_HEADER = 'date || credit || debit || balance';

  function todayAsString() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  this.printStatement = function printStatement() {
    if (accountActions.length === 0) {
      return STATEMENT_HEADER;
    }

    return `${STATEMENT_HEADER}\n${accountActions.join('\n')}`;
  };

  this.deposit = function deposit(amount) {
    balance += amount;
    accountActions.push(`${todayAsString()} || ${amount}.00 || || ${balance}.00`);
    return `${amount} successfully deposited on ${todayAsString()}`;
  };

  this.withdraw = function withdraw(amount) {
    balance -= amount;
    accountActions.push(`${todayAsString()} || || 1000.00 || -1000.00`);
    return `${amount} successfully withdrawn on ${todayAsString()}`;
  };
}

module.exports = Bank;
