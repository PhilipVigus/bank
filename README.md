# Bank technical challenge

![](./account-screenshot.png)

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

| Purpose       | Technology       |
| ------------- | ---------------- |
| Language      | Javascript(node) |
| Testing       | Jasmine          |
| Linting       | ESLint           |
| Code Coverage | nyc              |

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

# get a coverage report
npm run coverage
```

### Interacting with the code

```bash
# run the following file to see the code in action
node exampleCodeUsage.js
```

### User stories

These were the user stories I wrote based on the requirements and acceptance criteria I was given.

```
As a user
So that I can see the current state of my balance
I want to print my balance
```

```
As a user
So that my balance is easy to read
I want the transactions to be in reverse chronological order,
with credit, debit and balance columns
```

```
As a user
So that I can access my money
I want to be able to withdraw money
```

```
As a user
So that I can save my money
I want to be able to deposit money
```

```
As a user
So that I know when a transaction was invalid
I want to get meaningful error messages
Criteria
- amounts must be positive numbers with a maximum of 2 decimals places
- withdrawals fail if there are insufficient funds in the account
```

### Implementation process and challenges

#### Structure

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG5cdEFjY291bnQgPHwtLSBUcmFuc2FjdGlvblxuXHRUcmFuc2FjdGlvbiA8fC0tIGlzVmFsaWRBbW91bnRcblx0QWNjb3VudCA8fC0tIFN0YXRlbWVudFxuXHRjbGFzcyBBY2NvdW50e1xuXHRcdCt3aXRoZHJhdyhhbW91bnQpXG5cdFx0K2RlcG9zaXQoYW1vdW50KVxuXHRcdCtwcmludFN0YXRlbWVudCgpXG5cdFx0LWFkZFdpdGhkcmF3bCgpXG5cdFx0LWFkZERlcG9zaXQoKVxuXHRcdC1jaGVja0F2YWlsYWJsZUZ1bmRzKClcblx0XHQtdHJhbnNhY3Rpb25zW11cblx0XHQtaW50IGJhbGFuY2Vcblx0fVxuXHRjbGFzcyBpc1ZhbGlkQW1vdW50e1xuXHRcdCtpc1ZhbGlkQW1vdW50KGFtb3VudClcblx0XHQtaXNOdW1iZXIobnVtYmVyKVxuXHRcdC1oYXNWYWxpZERlY2ltYWxzKG51bWJlcilcblx0XHQtZ2V0RGVjaW1hbHMobnVtYmVyKVxuXHR9XG5cdGNsYXNzIFN0YXRlbWVudHtcblx0XHQtc3RyaW5nIFNUQVRFTUVOVF9IRUFERVJcblx0XHQtdHJhbnNhY3Rpb25zW11cblx0XHQtZGF0ZVRvU3RyaW5nKGRhdGUpXG5cdFx0LXRyYW5zYWN0aW9uc1RvU3RhdGVtZW50U3RyaW5nKClcblx0XHQrcHJpbnQoKVxuXHR9XG5cdGNsYXNzIFRyYW5zYWN0aW9ue1xuXHRcdC12YWxpZGF0ZVRyYW5zYWN0aW9uKGFtb3VudClcblx0XHQtdmFsaWRhdGVBbW91bnQoYW1vdW50KVxuXHRcdCtzdHJpbmcgdHlwZVxuXHRcdCtkYXRlIGRhdGVcblx0XHQrZmxvYXQgYW1vdW50XG5cdH0iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG5cdEFjY291bnQgPHwtLSBUcmFuc2FjdGlvblxuXHRUcmFuc2FjdGlvbiA8fC0tIGlzVmFsaWRBbW91bnRcblx0QWNjb3VudCA8fC0tIFN0YXRlbWVudFxuXHRjbGFzcyBBY2NvdW50e1xuXHRcdCt3aXRoZHJhdyhhbW91bnQpXG5cdFx0K2RlcG9zaXQoYW1vdW50KVxuXHRcdCtwcmludFN0YXRlbWVudCgpXG5cdFx0LWFkZFdpdGhkcmF3bCgpXG5cdFx0LWFkZERlcG9zaXQoKVxuXHRcdC1jaGVja0F2YWlsYWJsZUZ1bmRzKClcblx0XHQtdHJhbnNhY3Rpb25zW11cblx0XHQtaW50IGJhbGFuY2Vcblx0fVxuXHRjbGFzcyBpc1ZhbGlkQW1vdW50e1xuXHRcdCtpc1ZhbGlkQW1vdW50KGFtb3VudClcblx0XHQtaXNOdW1iZXIobnVtYmVyKVxuXHRcdC1oYXNWYWxpZERlY2ltYWxzKG51bWJlcilcblx0XHQtZ2V0RGVjaW1hbHMobnVtYmVyKVxuXHR9XG5cdGNsYXNzIFN0YXRlbWVudHtcblx0XHQtc3RyaW5nIFNUQVRFTUVOVF9IRUFERVJcblx0XHQtdHJhbnNhY3Rpb25zW11cblx0XHQtZGF0ZVRvU3RyaW5nKGRhdGUpXG5cdFx0LXRyYW5zYWN0aW9uc1RvU3RhdGVtZW50U3RyaW5nKClcblx0XHQrcHJpbnQoKVxuXHR9XG5cdGNsYXNzIFRyYW5zYWN0aW9ue1xuXHRcdC12YWxpZGF0ZVRyYW5zYWN0aW9uKGFtb3VudClcblx0XHQtdmFsaWRhdGVBbW91bnQoYW1vdW50KVxuXHRcdCtzdHJpbmcgdHlwZVxuXHRcdCtkYXRlIGRhdGVcblx0XHQrZmxvYXQgYW1vdW50XG5cdH0iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

- The code is separated into 3 classes. I had originally implemented separate Deposit and Withdrawal classes, but decided that there was not a sufficient case for doing this. 99% of the code was shared between them, so I combined them into a generic Transaction class instead.
- IsValidAmount is a utility function. Although it is only used in the Transaction class, it made sense to extract this functionality out into its own module, and made the Transaction class a lot simpler.

In the main, the implementation developed organically, with refactorings and general design decisions naturally coming out of the tests I was writing. However, there were a couple of issues that merit further discussion.

#### Refactoring

The first major refactoring split the Statement class away from Account. As I was coding, a clear separation in responsibility developed within the Account account, and it was a straightforward decision to extract the Statement class out.

The second major refactoring involved creating Deposit and Withdraw classes. I initially resisted this, prefering to keep all display logic within the Statement class. However, on reflection it made sense to create the two types of transaction, with Statement calling them to get how they should be displayed on the statement.

My third refactoring effectively undid the second. On reflection, the Deposit and Withdraw classes were not sufficiently different to justify their own classes. Instead I combined them into a more general Transaction class.

#### Validation of user input

It took a while to work out the best way of checking that deposit and withdrawal amounts are numbers. Javascript doesn't make this easy, and there are downsides to most of the standard approaches. Many of these have loopholes relating to implicit type coersion that meant I didn't feel they were appropriate to use.

Although using a regex feels clunky, I feel it is probably the most consistent and sound approach when used in conjunction with the other validation checks in place.
