import Transaction from '../src/transaction';

describe('Transaction', () => {
  const date = new Date('2020-5-6');

  describe('valid transaction', () => {
    it('allows you to deposit a valid amount', () => {
      const details = { date, amount: 3000, balance: 3000 };

      expect(() => {
        new Transaction(details, 'deposit');
      }).not.toThrow();
    });

    it('allows you to withdraw a valid amount', () => {
      const details = { date, amount: 3000, balance: 3000 };

      expect(() => {
        new Transaction(details, 'withdrawal');
      }).not.toThrow();
    });
  });

  describe('invalid transactions', () => {
    it('prevents you from withdrawing a valid amount', () => {
      const details = { date, amount: -1, balance: 3000 };

      expect(() => {
        new Transaction(details, 'withdrawal');
      }).toThrow(new Error('Unable to make withdrawal - amount is invalid'));
    });

    it('prevents you from deposit a valid amount', () => {
      const details = { date, amount: '100', balance: 3000 };

      expect(() => {
        new Transaction(details, 'deposit');
      }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });
  });
});
