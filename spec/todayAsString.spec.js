const todayAsString = require('../src/todayAsString.js');

describe('todayAsString', () => {
  it('returns todays date as a nicely formatted string', () => {
    jasmine.clock().install();
    jasmine.clock.mockDate;

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    expect(todayAsString()).toEqual(`${day}/${month}/${year}`);
    jasmine.clock().uninstall();
  });
});
