export class Calculator {
  add(num1, num2) {
    function resolve(operand1, operand2) {
      length =
        operand1.length > operand2.length ? operand1.length : operand2.length;
      for (let i = length - 1, sum = 0; i >= 0; i--) {
        sum = (+operand1[i] || 0) + (+operand2[i] || 0) + sum;
        if (sum >= 10) {
          result[i] = sum - 10;
          sum = 1;
        } else {
          result[i] = sum;
          sum = 0;
        }
      }
      console.log(result);
      return result.reverse().join('');
    }
    let result = [];
    let length;
    if (!this.isNegative(num1) && !this.isNegative(num2)) {
      let operand1 = num1.split('').reverse();
      let operand2 = num2.split('').reverse();
      return resolve(operand1, operand2);
    }
    if (this.isNegative(num1) && this.isNegative(num2)) {
      let operand1 = num1.slice(1);
      let operand2 = num2.slice(1);
      return '-' + resolve(operand1, operand2);
    }
    if (this.isNegative(num1) || this.isNegative(num2)) {
      let operand1 = this.isNegative(num1)
        ? num1.slice(1)
        : num1.split('').join('');
      let operand2 = this.isNegative(num2)
        ? num2.slice(1)
        : num2.split('').join('');
      return this.isNegative(num2)
        ? this.sub(operand1, operand2)
        : this.sub(operand2, operand1);
    }
  }

  sub(num1, num2) {
    function resolve(operand1, operand2) {}
    if (!this.isNegative(num1) && this.isNegative(num2)) {
      let operand2 = num2.slice(1);
      return this.add(num1, operand2);
    }
    if (!this.isNegative(num1) && !this.isNegative(num2))
      return resolve(operand1, operand2);
  }
  divide(num1, num2) {
    return +num1 / +num2;
  }
  multiply(num1, num2) {
    return num1 * num2;
  }

  isNegative(s) {
    return s[0] == '-' || false;
  }
}

const calculator = new Calculator();
console.log(calculator.add('457', '346546'));
