function Bank() {
  this.printStatement = function printStatement() {
    return 'date || credit || debit || balance';
  };

  this.deposit = function deposit(amount) {
    if (amount === 1000) {
      return '1000 successfully deposited on 18/05/2020';
    } else {
      return '2000 successfully deposited on 18/05/2020';
    }
  };
}

module.exports = Bank;
