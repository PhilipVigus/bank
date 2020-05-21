import Transaction from '../src/transaction';

describe('Transaction', () => {
  const date = new Date('2020-5-6');

  describe('valid transaction', () => {
    it('allows you to deposit a valid amount', () => {
      expect(() => {
        new Transaction(date, 3000, 'deposit');
      }).not.toThrow();
    });

    it('allows you to withdraw a valid amount', () => {
      expect(() => {
        new Transaction(date, 3000, 'withdrawal');
      }).not.toThrow();
    });
  });

  describe('invalid transactions', () => {
    it('prevents you from withdrawing a valid amount', () => {
      expect(() => {
        new Transaction(date, -1, 'withdrawal');
      }).toThrow(new Error('Unable to make withdrawal - amount is invalid'));
    });

    it('prevents you from deposit a invalid amount', () => {
      expect(() => {
        new Transaction(date, '100', 'deposit');
      }).toThrow(new Error('Unable to make deposit - amount is invalid'));
    });
  });
});
