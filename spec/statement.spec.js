import Statement from '../src/statement';

describe('Statement', () => {
  const date = new Date('2020-05-21');

  describe('.print', () => {
    it('prints a blank statement', () => {
      const statement = new Statement();

      expect(statement.print()).toEqual('date || credit || debit || balance');
    });

    it('prints a statement with transactions', () => {
      const deposit = { type: 'deposit', amount: 2000, date };
      const withdrawal = { type: 'withdrawal', amount: 1000, date };

      const statement = new Statement([deposit, withdrawal]);
      statement.print();

      expect(statement.print()).toEqual(
        'date || credit || debit || balance\n' +
          '21/05/2020 || || 1000.00 || 1000.00\n' +
          '21/05/2020 || 2000.00 || || 2000.00'
      );
    });
  });
});
