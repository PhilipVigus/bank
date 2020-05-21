import Account from './src/account.js';

const account = new Account();
console.log('\nAccount.printStatement() for an empty statement');
console.log(account.printStatement());
console.log('\nAccount.deposit() and Account.withdraw() successes');
console.log(account.deposit(100));
console.log(account.deposit(323.11));
console.log(account.withdraw(300.04));
console.log('\nAccount.deposit() and Account.withdraw() errors');
console.log(account.deposit(-100));
console.log(account.withdraw(0));
console.log(account.withdraw(50000));
console.log('\nAccount.printStatement() for a statement with transactions');
console.log(account.printStatement());
