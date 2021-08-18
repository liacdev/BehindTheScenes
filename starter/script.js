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

var me = 'Jago';
let job = 'teacher';
const year = 1991;

// Function hoisting

// console.log('Line 59: ' + addDecl(2, 3)); // Returned 5
// console.log(addExpr(2, 3)); // Error: Cannot access before initialization
// console.log(addArrow(2, 3)); // Error: Cannot access before initialization
// console.log('Line 62: ' + addArrow); // Error: Undefined (declared as a var)

function addDecl(a, b) {
  return a + b;
}

// Using const
/*const addExpr = function (a, b) {
  // This function is now a const variable so it is in the TDZ
  // We are assigning a function value to a variable, and const is block scoped
  return a + b;
};

const addArrow = (a, b) => a + b;
*/

// Using var
const addExpr = function (a, b) {
  // This function is now a var variable so...
  // We are assigning a function value to a variable, and var is function scoped
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example: Why we shouldn't use var
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  // console.log('All products deleted!');
}
// We get all products deleted even though numProducts = 10
// This happens because of hoisting
// numProducts was hoisted to undefined at the time it was called, so it held no value and the shopping cart was deleted
// Undefined is a falsey value, so the function will still execute

// Another example:
var x = 1;
let y = 2;
const z = 3;

// console.log(x === window.x); // True
// console.log(y === window.y); // False
// console.log(z === window.z); // False

// 97: The this keyword
// Outside any function - global scoped
// console.log(this);

// Inside a function
const calcAge = function (birthYear) {
  // console.log(2037 - birthYear);
  // console.log(this);  // Undefined
};
calcAge(1991);

// Inside an arrow function
const calcAgeArrow = birthYear => {
  // console.log(2037 - birthYear);
  // console.log(this);
};
calcAgeArrow(1991);

// Inside a method
const jago = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jago.calcAge(); // Points at the object calling the method, not the object in which we wrote the method

// Another example
// Method borrowing

const matilda = {
  year: 2017,
};

matilda.calcAge = jago.calcAge;

matilda.calcAge();

// We can copy this function into the variable f because a function is just a value
const f = jago.calcAge;

// But we cannot use it without the this keyword

f(); // Cannot read, property 'year' undefined at calcAge...
// this f is now a regular function call and not attached to any object

// 98: Regular functions vs arrow functions
