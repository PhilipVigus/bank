function getDecimals(number) {
  const decimalPart = number.toString().split('.')[1];
  return decimalPart.length;
}

function hasValidDecimals(number) {
  let numberOfDecimals = 0;

  if (Math.floor(number) !== number) {
    numberOfDecimals = getDecimals(number);
  }

  return numberOfDecimals < 3;
}

function isNumber(value) {
  /**
   * ^[-]?\d+(\.\d+)?$
   *
   * ^ - anchor to start
   * [-]? - optional minus sign
   * \d+ - one or more digits
   * (\.\d+) - a decimal point followed by one or more digits
   * ? - decimal part is optional
   * $ - anchor to end
   */
  return value.toString().match(/^[-]?\d+(\.\d+)?$/) !== null
    && typeof value === 'number';
}

function isValidAmount(amount) {
  return (amount !== undefined)
  && isNumber(amount)
  && hasValidDecimals(amount)
  && (amount > 0);
}

module.exports = isValidAmount;
