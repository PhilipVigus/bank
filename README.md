# Bank technical challenge

This repository contains my attempt that the Makers Academy individual technical test that can be found [here](https://github.com/makersacademy/course/blob/master/individual_challenges/bank_tech_test.md)

## Specification

Requirements
- You should be able to interact with your code via a REPL like IRB or the JavaScript console. (You don't need to implement a command line interface that takes input from STDIN.)
- Deposits, withdrawal.
- Account statement (date, amount, balance) printing.
- Data can be kept in memory (it doesn't need to be stored to a database or anything).

Acceptance criteria
- Given a client makes a deposit of 1000 on 10-01-2012
- And a deposit of 2000 on 13-01-2012
- And a withdrawal of 500 on 14-01-2012
- When she prints her bank statement
- Then she would see

```
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```
## Approach

| Purpose  	| Technology       	|
|----------	|------------------	|
| Language 	| Javascript(node) 	|
| Testing  	| Jasmine          	|
| Linting   | ESLint            |

### Getting started

```bash
# clone the repository to your local machine with either

# if you're using ssh
git clone git@github.com:PhilipVigus/bank.git

# if you're using https
git clone https://github.com/PhilipVigus/bank.git

# Dependencies
# The repository requires node and npm, which can be installed with the following commands
# on mac
brew update
brew install node
# on linux (you need to install npm separately)
sudo apt install nodejs
sudo apt install npm

# then run npm install from the project root directory
# this installs the project dependencies
npm install
```

### Running tests

```bash
# run tests from the project root with the following command
npm run test
```

### Interacting with the code

```bash
# start node on the commandline
node

# require account.js
require('./src/account.js');

# use any of the account public methods
```

Example output:

```bash
Makerss-Air-2:bank student$ node
Welcome to Node.js v14.2.0.
Type ".help" for more information.
> const Account = require('./src/account.js');
undefined
> const account = new Account();
undefined
> account.deposit(100);
'100 successfully deposited'
> account.withdraw(50);
'50 successfully withdrawn'
> account.printStatement();
'date || credit || debit || balance\n' +
  '19/05/2020 || || 50.00 || 50.00\n' +
  '19/05/2020 || 100.00 || || 100.00'
> account.withdraw();
'Unable to make withdrawl - amount is not specified'
> 
```

### User stories

These were the user stories I wrote based on the requirements and acceptance criteria I was given

```
As a user
So that I can see the current state of my balance
I want to print my balance

As a user
So that my balance is easy to read
I want the transactions to be in reverse chronological order,
with credit, debit and balance columns

As a user
So that I can access my money
I want to be able to withdraw money

As a user
So that I can save my money
I want to be able to deposit money

As a user
So that I know when a transaction was invalid
I want to get meaningful error messages
Criteria
- amounts must be positive numbers with a maximum of 2 decimals places
- withdrawls fail if there are insufficient funds in the account
```

### Implementation process and challenges

My initial steps were too rushed, and although I was following TDD, it meant that I made unnecessary mistakes. Once I slowed down, progress was far smoother.

In the main, the implementation developed organically, with refactorings and general design decisions naturally coming out of the tests I was writing. However, there were a couple of issues that merit further discussion:

#### Not using function prototypes

This was something I thought long and hard about. Function prototypes are mostly useful in a scenario where you expect those functions to be used as part of prototypal inheritance. However, their use makes implementation of information hiding and privacy more complex, and code less readable.

It could be argued that accounts should be implemented using prototypes so that the system is easy to extend with additional account types. However, the Account function only has three public functions at the moment, and is relatively straightforward. It wouldn't be difficult to refactor so that it uses prototypes if necessary, and I felt that based on the specifications I was given, having simpler code was more important.

#### Separate deposit and withdraw module/functions

I experimented with refactoring deposit and withdrawl functionality into separate modules, each with their own constructor functions. There is certainly a case for doing this, as it would make the addition of other account transaction types simpler to implement.

However, one of the main benefits of doing so would be to make account transactions polymorphic. The main area that would benefit from this is in the Statement.Print function, where you could lose the if/else statement. The problem with this, is that you then need to move responsibility for knowing what a transaction statement line looks like back onto the transaction itself. I prefer my approach, where all statement printing and display logic sits with the Statement function.

#### Validation of user input

It took a while to work out the best way of checking that deposit and withdrawl amounts are numbers. Javascript doesn't make this easy, and there are downsides to most of the standard approaches. Many of these have loopholes relating to implicit type coersion that meant I didn't feel they were appropriate to use.

Although using a regex feels clunky, I feel it is probably the most consistent and sound approach when used in conjunction with the other validation checks in place.
