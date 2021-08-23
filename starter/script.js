'use strict';

// Scoping in practice
// Global scope
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);

  // Function scope
  function printAge() {
    // firstName ultimately looks to global scope
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    // Check if millenial, block scope
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true; // Var is function scoped
      const firstName = 'Doive'; // Declare a variable again
      const str = `Oh, and you're a millennial, ${firstName}`; // Const is block scoped
      // JS goes and gets the first firstName that it finds
      console.log('Line 21: ' + str);
      function add(a, b) {
        return a + b;
      }

      output = 'NEW OUTPUT!';
    }

    // console.log(str);  // This will not work out here because const is block scoped
    console.log('Line 30: ' + millennial); // This will work because var is function scoped
    // add(2, 3);  // Will not work because function add() is scoped to the block in which it was defined
    // Only true for strict mode, this will work if strict mode turned off
    // console.log(add(2, 3));
    console.log('Line 34: ' + output); // New output logged by manipulating an existing variable in a child scope
  }
  printAge();

  return age;
}

const firstName = 'Ello';
calcAge(1991);
*/
// console.log(age);  // Will not work out here
// printAge();  // Will not work out here either

// Lesson 95: Hoisting and the TDZ in practice

//Variable hoisting
// console.log('Line 49: ' + me); // <== Undefined
// console.log(job);  <== Error
// console.log(year);  <==Error

// var me = 'Jago';
// let job = 'teacher';
// const year = 1991;

// Function hoisting

// console.log('Line 59: ' + addDecl(2, 3)); // Returned 5
// console.log(addExpr(2, 3)); // Error: Cannot access before initialization
// console.log(addArrow(2, 3)); // Error: Cannot access before initialization
// console.log('Line 62: ' + addArrow); // Error: Undefined (declared as a var)

// function addDecl(a, b) {
//   return a + b;
// }

// Using const
/*const addExpr = function (a, b) {
  // This function is now a const variable so it is in the TDZ
  // We are assigning a function value to a variable, and const is block scoped
  return a + b;
};

const addArrow = (a, b) => a + b;
*/

// Using var
// const addExpr = function (a, b) {
//   // This function is now a var variable so...
//   // We are assigning a function value to a variable, and var is function scoped
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// Example: Why we shouldn't use var
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   // console.log('All products deleted!');
// }
// We get all products deleted even though numProducts = 10
// This happens because of hoisting
// numProducts was hoisted to undefined at the time it was called, so it held no value and the shopping cart was deleted
// Undefined is a falsey value, so the function will still execute

// Another example:
// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x); // True
// console.log(y === window.y); // False
// console.log(z === window.z); // False

// 97: The this keyword
// Outside any function - global scoped
// console.log(this);

// Inside a function
// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); // Undefined
// };
// calcAge(1991);

// Inside an arrow function
// const calcAgeArrow = birthYear => {
//   // console.log(2037 - birthYear);
//   // console.log(this);
// };
// calcAgeArrow(1991);

// Using a method
/*
const jago = {
  year: 1991,
  calcAge() {
    console.log(this);
    console.log(2037 - this.year);
  },
};
*/
// jago.calcAge(); // Points at the object calling the method, not the object in which we wrote the method

// Another example
// Method borrowing

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jago.calcAge;

// matilda.calcAge();

// We can copy this function into the variable f because a function is just a value
// const f = jago.calcAge;

// But we cannot use it without the this keyword

// f(); // Cannot read, property 'year' undefined at calcAge...
// this f is now a regular function call and not attached to any object

// 98: Regular functions vs arrow functions

// Variables declared with var create properties on the global object and can introduce bugs
// var firstName = 'Matilda';

// Using the object from before
// const jago = {
//   firstName: 'Jago',
//   year: 1991,
//   calcAge() {
//     console.log(this);
//     console.log(2037 - this.year);

//     /*
//     // Solution 1
//     const self = this;
//     const isMillennial = function () {
//       console.log(this); // Undefined
//       // console.log(this.year >= 1981 && this.year <= 1996); // <--Causes our problem cannot read property 'year' of undefined below
//       console.log(self); // Using self
//       console.log(self.year >= 1981 && self.year <= 1996); // <--Using self
//     };
//     */

//     // Solution 2
//     // const isMillennial = () => {
//     //   console.log(this); // Arrow functions don't get a this keyword, so this this is referencing the jago object
//     //   console.log(this.year >= 1981 && this.year <= 1996); // <--Using self
//     // };

//   //   isMillennial(); // Called later as we call the calcAge function
//   // },

//   // greet: () => {
//   //   console.log(this);
//   //   console.log(`Hey ${this.firstName}`);
//   // },
// };

// Before declaring var, these lines were undefined
// After declaring var, these lines are defined as 'Matilda'

// jago.greet(); // Hey undefined
// An arrow function DOES NOT get its own this keyword
// It will use the parent scope this keyword
// console.log(this.firstName); // Also undefined

// So, as a best practice, never use an arrow function as a method!

// Another problem is when we have a function inside a method
//  Error: Cannot read property 'year' of undefined
// jago.calcAge();

// Arguments keyword
//  This is useful when we need a function to accept more parameters than specified
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8); // Error: arguments is not defined at addArrow
// Argument does not exist in an arrow function

// 99: Primitives vs Objects
// Everything here works as expected
// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'jago',
//   age: 46,
// };

// const friend = me;
// friend.age = 4;
// console.log('Friend:', friend);
// console.log('me:', me);

// 100: Primitives vs Objects in practice:

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before married: ', jessica);
console.log('After married:', marriedJessica);

// marriedJessica = {};  This won't work!

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
console.log('Jessica2: ', jessica2);
console.log('JessicaCopy: ', jessicaCopy);
jessicaCopy.lastName = 'Davis';
console.log('JessicaCopy: ', jessicaCopy);
console.log(jessica2.family);
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log(jessica2);
console.log(jessicaCopy);
