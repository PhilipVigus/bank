function Bank() {
  this.printStatement = function printStatement() {
    return 'date || credit || debit || balance';
  };

  this.deposit = function deposit(amount) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${amount} successfully deposited on ${day}/${month}/${year}`;
  };
}

module.exports = Bank;
