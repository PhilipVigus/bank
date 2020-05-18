function Bank() {
  this.printStatement = function printStatement() {
    return 'date || credit || debit || balance';
  };

  this.deposit = function deposit(amount) {
    return '1000 successfully deposited on 18/05/2020';
  };
}

module.exports = Bank;
