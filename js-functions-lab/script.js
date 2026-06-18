/* =====================================================================
   JavaScript Functions Lab
   Author: Janarthan Pragalathan
   =====================================================================
   This file contains all the required lab functions. The interactive
   wiring at the bottom connects each function to the page so you can
   see inputs and return values without opening the console — but every
   function is also logged to the console as the lab instructions ask.
   ===================================================================== */


/* ---------------------------------------------------------------------
   PART 1 — Declaring and Invoking Functions
   Step 1: greet(name) returns a greeting string.
   Bonus: a default value gives a fallback greeting when no name passed.
   --------------------------------------------------------------------- */
function greet(name = "stranger") {
  return "Hello, " + name + "!";
}

// Step 2: Invoke greet and log the result to the console.
console.log(greet("Janarthan"));   // -> "Hello, Janarthan!"
console.log(greet());              // -> "Hello, stranger!" (bonus default)


/* ---------------------------------------------------------------------
   PART 2 — Parameters and Return Values
   Step 3: addNumbers(num1, num2) returns the sum.
   --------------------------------------------------------------------- */
function addNumbers(num1, num2) {
  return num1 + num2;
}

console.log("addNumbers(5, 7) =", addNumbers(5, 7));   // -> 12


/* ---------------------------------------------------------------------
   PART 3 — Function Scope
   Step 4: A global x, and a local x inside changeValue().
   The local x does NOT overwrite the global one.
   --------------------------------------------------------------------- */
let x = 10; // global scope

function changeValue() {
  let x = 99; // local scope — separate variable, shadows the global
  console.log("Inside changeValue(), local x =", x);   // -> 99
  return x;
}

console.log("Before calling changeValue(), global x =", x); // -> 10
changeValue();
console.log("After calling changeValue(), global x =", x);  // -> 10 (unchanged)


/* ---------------------------------------------------------------------
   PART 4 — Closures
   Step 5: outerFunction() keeps `count` alive between calls of the
   returned inner function.
   --------------------------------------------------------------------- */
function outerFunction() {
  let count = 0;
  return function () {
    count += 1;        // remembers and updates the outer variable
    return count;
  };
}

const counter = outerFunction();
console.log("counter() =", counter()); // -> 1
console.log("counter() =", counter()); // -> 2
console.log("counter() =", counter()); // -> 3


/* ---------------------------------------------------------------------
   BONUS — Another closure with different behaviour: an accumulator that
   keeps a running total of every number you feed it.
   --------------------------------------------------------------------- */
function makeAccumulator() {
  let total = 0;
  return function (amount) {
    total += amount;
    return total;
  };
}

const accumulate = makeAccumulator();
console.log("accumulate(10) =", accumulate(10)); // -> 10
console.log("accumulate(5)  =", accumulate(5));  // -> 15


/* =====================================================================
   INTERACTIVE WIRING
   Connects the functions above to the page UI. None of this changes the
   lab logic — it just lets you try inputs live in the browser.
   ===================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const $ = (id) => document.getElementById(id);

  // --- greet ---
  const runGreet = () => {
    const value = $("greet-input").value.trim();
    const result = value ? greet(value) : greet(); // empty -> default
    $("greet-output").textContent = result;
  };
  $("greet-run").addEventListener("click", runGreet);
  $("greet-input").addEventListener("keyup", (e) => { if (e.key === "Enter") runGreet(); });

  // --- addNumbers ---
  const runAdd = () => {
    const a = Number($("add-a").value);
    const b = Number($("add-b").value);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      $("add-output").textContent = "Enter two numbers.";
      return;
    }
    $("add-output").textContent = "= " + addNumbers(a, b);
  };
  $("add-run").addEventListener("click", runAdd);

  // --- scope ---
  $("scope-run").addEventListener("click", () => {
    const localX = changeValue(); // logs to console, returns local value
    $("scope-output").textContent =
      "global x stays " + x + "  •  local x inside the function was " + localX;
  });

  // --- closure: counter ---
  const liveCounter = outerFunction();
  $("counter-run").addEventListener("click", () => {
    $("counter-output").textContent = "count = " + liveCounter();
  });

  // --- bonus: accumulator ---
  const liveAccumulator = makeAccumulator();
  const runAcc = () => {
    const n = Number($("acc-input").value);
    if (Number.isNaN(n)) {
      $("acc-output").textContent = "Enter a number to add.";
      return;
    }
    $("acc-output").textContent = "running total = " + liveAccumulator(n);
  };
  $("acc-run").addEventListener("click", runAcc);
  $("acc-input").addEventListener("keyup", (e) => { if (e.key === "Enter") runAcc(); });
});
