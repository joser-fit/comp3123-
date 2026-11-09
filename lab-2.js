// Exercise 1: Greet each person using ES6 syntax.
console.log(``)
console.log(`Exercise 1: Greet each person using ES6 syntax.`)
const greeter = (names) => {
  const greeting = 'Hello';

  for (let name of names) {
    console.log(`${greeting} ${name}`);
  }
};

greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan']);




// Exercise 2: Capitalize the first letter and lowercase the rest.
console.log(``)
console.log(`Exercise 2: Capitalize the first letter and lowercase the rest.`)

const capitalize = (word) => {
  const [first = '', ...rest] = [...word.toLowerCase()];
  return first.toUpperCase() + rest.join('');
};

console.log(capitalize('fooBar'));
console.log(capitalize('nodeJs'));

console.log(``)
console.log(`Exercise 3: Capitalize every color using map.`)
// Exercise 3: Capitalize every color using map.

const colors = ['red', 'green', 'blue'];
const capitalizedColors = colors.map(capitalize);
console.log(capitalizedColors);

console.log(``)
console.log(`Exercise 4: Keep only the numbers below 20.`)
// Exercise 4: Keep only the numbers below 20.
const values = [1, 60, 34, 30, 20, 5];
const filterLessThan20 = values.filter((value) => value < 20);
console.log(filterLessThan20);

console.log(``)
console.log(`Exercise 5: Calculate the sum and product using reduce.`)
// Exercise 5: Calculate the sum and product using reduce.
const numbers = [1, 2, 3, 4];
const calculateSum = numbers.reduce((sum, number) => sum + number, 0);
const calculateProduct = numbers.reduce((product, number) => product * number, 1);
console.log(calculateSum);
console.log(calculateProduct);

console.log(`Exercise 6: Create a Car class and a Sedan subclass.`)
// Exercise 6: Create a Car class and a Sedan subclass.
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  details() {
    return `Model: ${this.model} Engine ${this.year}`;
  }
}

class Sedan extends Car {
  constructor(model, year, balance) {
    super(model, year);
    this.balance = balance;
  }

  info() {
    return `${this.model} has a balance of $${this.balance.toFixed(2)}`;
  }
}

const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details());

const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info());