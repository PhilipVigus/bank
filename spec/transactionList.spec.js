import TransactionList from '../src/transactionList.js';

describe('TransactionList', () => {
  describe('.forEach', () => {
    it('iterates over an empty list of transactions', () => {
      const list = new TransactionList();
      let transactions = '';

      list.forEach((transaction) => {
        transactions += transaction.amount;
      });

      expect(transactions).toEqual('');
    });

    it('iterates over list of transactions', () => {
      const list = new TransactionList();
      let transactions = '';
      list.add({ amount: 200 });
      list.add({ amount: 100 });

      list.forEach((transaction) => {
        transactions += `${transaction.amount}\n`;
      });

      expect(transactions).toEqual('200\n100\n');
    });
  });

  describe('.add', () => {
    it('allows you to add a transaction', () => {
      const list = new TransactionList();
      list.add({ amount: 200 });
      let transactions = '';

      list.forEach((transaction) => {
        transactions += `${transaction.amount}\n`;
      });

      expect(transactions).toEqual('200\n');
    });
  });
});
