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

    const statement = accountActions.map((action) => {
      if (action.type === 'deposit') {
        return `${todayAsString()} || ${action.amount}.00 || || ${action.balance}.00`;
      } else {
        return `${todayAsString()} || || ${action.amount}.00 || ${action.balance}.00`;
      }
    }).join('\n');

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

module.exports = Bank;
