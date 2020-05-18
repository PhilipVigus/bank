function Bank() {
  let accountActions = [];
  let balance = 0;

  this.printStatement = function printStatement() {
    let statement = 'date || credit || debit || balance';

    if (accountActions.length === 0) {
      return statement;
    }

    return `${statement}\n${accountActions.join('\n')}`;
  };

  this.deposit = function deposit(amount) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    balance += amount;
    accountActions.push(`${day}/${month}/${year} || ${amount}.00 || || ${balance}.00`);

    return `${amount} successfully deposited on ${day}/${month}/${year}`;
  };

  this.withdraw = function withdraw(amount) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${amount} successfully withdrawn on ${day}/${month}/${year}`;
  };
}

module.exports = Bank;
