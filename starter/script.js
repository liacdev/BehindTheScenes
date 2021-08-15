'use strict';

// Scoping in practice
// Global scope
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
      console.log(str);
      function add(a, b) {
        return a + b;
      }

      output = 'NEW OUTPUT!';
    }

    // console.log(str);  // This will not work out here because const is block scoped
    console.log(millennial); // This will work because var is function scoped
    // add(2, 3);  // Will not work because function add() is scoped to the block in which it was defined
    // Only true for strict mode, this will work if strict mode turned off
    // console.log(add(2, 3));
    console.log(output); // New output logged by manipulating an existing variable in a child scope
  }
  printAge();

  return age;
}

const firstName = 'Ello';
calcAge(1991);
// console.log(age);  // Will not work out here
// printAge();  // Will not work out here either
