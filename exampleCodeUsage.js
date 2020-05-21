import Account from './src/account.js';

const account = new Account();
console.log(account.printStatement());
console.log(account.deposit(100));
console.log(account.deposit(323.11));
console.log(account.withdraw(-100));
console.log(account.printStatement());
