export class Calculator {
  add(num1, num2) {
    function resolve(operand1, operand2) {
      let result = [];
      let length =
        operand1.length > operand2.length ? operand1.length : operand2.length;
      for (let i = 0, sum = 0; i < length; i++) {
        sum = (+operand1[i] || 0) + (+operand2[i] || 0) + sum;
        if (sum >= 10) {
          result[i] = sum - 10;
          sum = 1;
        } else {
          result[i] = sum;
          sum = 0;
        }
      }
      return result.reverse().join('');
    }

    if (!this.isNegative(num1) && !this.isNegative(num2)) {
      let operand1 = num1.split('').reverse();
      let operand2 = num2.split('').reverse();
      return resolve(operand1, operand2);
    }
    if (this.isNegative(num1) && this.isNegative(num2)) {
      let operand1 = num1.slice(1).split('').reverse();
      let operand2 = num2.slice(1).split('').reverse();
      return '-' + resolve(operand1, operand2);
    }
    if (this.isNegative(num1) || this.isNegative(num2)) {
      let operand1 = this.isNegative(num1) ? num1.slice(1) : num1;
      let operand2 = this.isNegative(num2) ? num2.slice(1) : num2;
      return this.isNegative(num2)
        ? this.sub(operand1, operand2)
        : this.sub(operand2, operand1);
    }
  }

  sub(num1, num2) {
    if (num1 == num2) return '0';
    function resolve(operand1, operand2) {
      let result = [];
      for (let i = 0, currentDiff = 0, diff = 0; i < operand1.length; i++) {
        currentDiff = +operand1[i] - (+operand2[i] || 0) - diff;
        if (currentDiff < 0) {
          result[i] = currentDiff + 10;
          diff = 1;
        } else {
          result[i] = currentDiff;
          diff = 0;
        }
      }
      return result.reverse().join('');
    }
    function isBiggestNum(num1, num2) {
      for (let i = 0; i < num1.length; i++) {
        if (num1[i].charCodeAt() > num1[i].charCodeAt()) return true;
        if (num1[i].charCodeAt() > num1[i].charCodeAt()) continue;
        return false;
      }
    }
    if (
      (!this.isNegative(num1) && !this.isNegative(num2)) ||
      (this.isNegative(num1) && this.isNegative(num2))
    ) {
      if (this.isNegative(num1)) {
        if (num1.length != num2.length) {
          let operand1 = num1.slice(1).split('').reverse();
          let operand2 = num2.slice(1).split('').reverse();
          return num1.length < num2.length
            ? resolve(operand2, operand1)
            : '-' + resolve(operand1, operand2);
        } else {
          let operand1 = num1.slice(1).split('').reverse();
          let operand2 = num2.slice(1).split('').reverse();
          return isBiggestNum(num1, num2)
            ? '-' + resolve(operand1, operand2)
            : resolve(operand2, operand1);
        }
      } else {
        if (num2.length != num1.length) {
          let operand1 = num1.split('').reverse();
          let operand2 = num2.split('').reverse();
          return num1.length > num2.length
            ? resolve(operand1, operand2)
            : '-' + resolve(operand2, operand1);
        } else {
          let operand1 = num1.split('').reverse();
          let operand2 = num2.split('').reverse();
          return isBiggestNum(num1.split(''), num2.split(''))
            ? resolve(operand1, operand2)
            : '-' + resolve(operand2, operand1);
        }
      }
    } else {
      if (this.isNegative(num1)) {
        let operand1 = num1.slice(1);
        return '-' + this.add(operand1, num2);
      }
      if (this.isNegative(num2)) {
        let operand2 = num2.slice(1);
        return this.add(num1, operand2);
      }
    }
  }
  divide(num1, num2) {
    return +num1 / +num2;
  }
  multiply(num1, num2) {
    if (num1 == '0' || num2 == '0') return '0';
    let operand1 = this.isNegative(num1)
      ? num1.slice(1).split('').reverse()
      : num1.split('').reverse();
    let operand2 = this.isNegative(num2)
      ? num2.slice(1).split('').reverse()
      : num2.split('').reverse();
    function resolve(operand1, operand2) {
      let result = [];
      let length =
        operand1.length > operand2.length ? operand1.length : operand2.length;
      for (let i = 0, d = 1; i < length; i++) {
        if (i == 0) result[i] = +operand1[i] * +operand2[i];
        else {
          if (operand1[i] && operand2[i]) {
            result[i] = +operand1[i] * +operand2[i] * 10 ** d;
            d++;
          } else {
            result[i] = operand1[i]
              ? +operand1.slice(i).join('') * 10 ** d
              : +operand2.slice(i).join('') * 10 ** d;
            break;
          }
        }
      }
      console.log(result);
      return result.reduce((acc, cur) => (acc += cur), 0);
    }
    if (
      (!this.isNegative(num1) && !this.isNegative(num2)) ||
      (this.isNegative(num1) && this.isNegative(num2))
    ) {
      return '' + resolve(operand1, operand2);
    } else {
      return '-' + resolve(operand1, operand2);
    }
  }

  isNegative(s) {
    return s[0] == '-' || false;
  }
}

const calculator = new Calculator();
console.log(
  calculator.multiply(
    '6753465365365656536563565363356536356563625249',
    '293432222233353245432543253245245234532452222248'
  )
);
