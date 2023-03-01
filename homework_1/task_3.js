export class Product {
  constructor(name = 'apple', price = 1, quantity = 0, description = 'iPhone') {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
  getFilteredProducts(str, products) {
    const filter = this.parseFilter(str);
    const checkProduct = item => {
      for (let key in filter) {
        return method[key][filter[key]['method']](
          filter[key]['value'],
          item[key]
        );
      }
    };

    let strMethod = {
      contains: (filter, product) => {
        return product.includes(filter);
      },
      starts: (filter, product) => {
        return product.startsWith(filter);
      },
      ends: (filter, product) => {
        return product.endsWith(filter);
      },
    };
    let numMethod = {
      '<': (num, prod) => {
        return prod < num;
      },
      '=': (num, prod) => {
        return prod == num;
      },
      '>': (num, prod) => {
        return prod > num;
      },
      '<=': (num, prod) => {
        return prod <= num;
      },
      '>=': (num, prod) => {
        return prod >= num;
      },
    };
    let method = {
      name: strMethod,
      price: numMethod,
      quantity: numMethod,
      description: strMethod,
    };

    return products.filter(product => {
      return checkProduct(product);
    });
  }
  parseFilter(str) {
    let filters = str
      .split('&')
      .map((item, index, arr) => (arr[index] = item.split('-')));
    return filters.reduce((acc, elem) => {
      if (elem[0] == 'name' || elem[0] == 'description') {
        acc[elem[0]] = { method: elem[1], value: elem[2] };
      }
      if (elem[0] == 'price' || elem[0] == 'quantity') {
        let operator = elem[1].match(/^\D+/);
        let number = elem[1].match(/\d+/);
        acc[elem[0]] = { method: operator.join(''), value: +number };
      }
      return acc;
    }, {});
  }
}

const products = [
  new Product('apple', 100, 20, 'iPhone pro12'),
  new Product('samsung', 50, 10, 'note max15'),
  new Product(),
  new Product('xiaomi', 25, 15, 'T10'),
  new Product('applefd', 2, 10, 'iPhone 16abc'),
  new Product(),
  new Product('apple', 100, 11, 'iPhone pro12'),
];
// const str = 'name-starts-xi&price->2&quantity->5&description-ends-0';
const str = 'price->2&quantity->10';
const prod = new Product();
console.log(prod.getFilteredProducts(str, products));
