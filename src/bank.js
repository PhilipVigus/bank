function Bank() {
  let accountActions = [];
  let balance = 0;

  function todayAsString() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  this.printStatement = function printStatement() {
    let statement = 'date || credit || debit || balance';

    if (accountActions.length === 0) {
      return statement;
    }

    return `${statement}\n${accountActions.join('\n')}`;
  };

  this.deposit = function deposit(amount) {
    balance += amount;
    accountActions.push(`${todayAsString()} || ${amount}.00 || || ${balance}.00`);

    return `${amount} successfully deposited on ${todayAsString()}`;
  };

  this.withdraw = function withdraw(amount) {
    return `${amount} successfully withdrawn on ${todayAsString()}`;
  };
}

module.exports = Bank;
