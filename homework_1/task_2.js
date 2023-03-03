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
      return result
        .reverse()
        .join('')
        .replace(/^0*(\d)/, '$1');
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
          return this.isBiggestNum(num1, num2)
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
          return this.isBiggestNum(num1.split(''), num2.split(''))
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
    let a = this.isNegative(num1) ? num1.slice(1) : num1;
    let b = this.isNegative(num2) ? num2.slice(1) : num2;
    let sign =
      (this.isNegative(num1) && this.isNegative(num2)) ||
      (!this.isNegative(num1) && !this.isNegative(num2))
        ? ''
        : '-';
    if (a.length < b.length || parseInt(a) == 0 || parseInt(b) == 0) return '0';
    if (a.length == b.length) {
      if (!this.isBiggestNum(a.split(''), b.split(''))) return '0';
    }

    let result = '';
    let idx = 0;
    let temp = a[idx] - '0';

    while (temp < b) {
      temp = temp * 10 + a[idx + 1].charCodeAt(0) - '0'.charCodeAt(0);
      idx += 1;
    }
    idx += 1;

    while (a.length > idx) {
      result += String.fromCharCode(Math.floor(temp / b) + '0'.charCodeAt(0));
      temp = (temp % b) * 10 + a[idx].charCodeAt(0) - '0'.charCodeAt(0);
      idx += 1;
    }
    result += String.fromCharCode(Math.floor(temp / b) + '0'.charCodeAt(0));
    console.log(this.multiply(result, b));

    const rest = this.sub(a, this.multiply(result, b));

    return `Результат деления: ${sign + result} остаток: ${rest}`;
  }
  multiply(num1, num2) {
    let a = this.isNegative(num1) ? num1.slice(1) : num1;
    let b = this.isNegative(num2) ? num2.slice(1) : num2;
    let sign =
      (this.isNegative(num1) && this.isNegative(num2)) ||
      (!this.isNegative(num1) && !this.isNegative(num2))
        ? ''
        : '-';
    const result = Array(a.length + b.length).fill(0);
    for (let i = a.length; i--; null) {
      let carry = 0;
      for (let j = b.length; j--; null) {
        result[1 + i + j] += carry + a[i] * b[j];
        carry = Math.floor(result[1 + i + j] / 10);
        result[1 + i + j] = result[1 + i + j] % 10;
      }
      result[i] += carry;
    }
    return sign + result.join('').replace(/^0*(\d)/, '$1');
  }

  isNegative(s) {
    return s[0] == '-' || false;
  }
  isBiggestNum(num1, num2) {
    for (let i = 0; i < num1.length; i++) {
      if (num1[i].charCodeAt() > num2[i].charCodeAt()) return true;
      if (num1[i].charCodeAt() == num2[i].charCodeAt()) continue;
      return false;
    }
    return true;
  }
}

const calculator = new Calculator();
console.log(calculator.add('793824932793793729', '932439247932')); // 793825865233041661
console.log(calculator.sub('-211', '-392')); // 181
console.log(
  calculator.multiply(
    '-2234323299999999999999999999999999999999999999999',
    '32343241324132432431243443243241324349'
  )
); // -72265257688031946066802873210601658515828031699967656758675867567568756556756758675651
console.log(
  calculator.divide(
    '1122222222222222222222222222222222222222222222222222222222222222',
    '112222222222222222222222222222222222222222222'
  )
); // 10000000000000000000 Остаток: 2222222222222222222
