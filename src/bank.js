function Bank() {
  this.printStatement = function printStatement() {
    return 'date || credit || debit || balance';
  };
}

module.exports = Bank;
