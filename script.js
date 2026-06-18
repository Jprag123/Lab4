function greet(name = "stranger") {
  return "Hello, " + name + "!";
}

console.log(greet("Janarthan"));
console.log(greet());


function addNumbers(num1, num2) {
  return num1 + num2;
}

console.log("addNumbers(5, 7) =", addNumbers(5, 7));


let x = 10;

function changeValue() {
  let x = 99;
  console.log("Inside changeValue(), local x =", x);
  return x;
}

console.log("Before calling changeValue(), global x =", x);
changeValue();
console.log("After calling changeValue(), global x =", x);


function outerFunction() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = outerFunction();
console.log("counter() =", counter());
console.log("counter() =", counter());
console.log("counter() =", counter());


function makeAccumulator() {
  let total = 0;
  return function (amount) {
    total += amount;
    return total;
  };
}

const accumulate = makeAccumulator();
console.log("accumulate(10) =", accumulate(10));
console.log("accumulate(5)  =", accumulate(5));


document.addEventListener("DOMContentLoaded", function () {
  const $ = (id) => document.getElementById(id);

  const runGreet = () => {
    const value = $("greet-input").value.trim();
    const result = value ? greet(value) : greet();
    $("greet-output").textContent = result;
  };
  $("greet-run").addEventListener("click", runGreet);
  $("greet-input").addEventListener("keyup", (e) => { if (e.key === "Enter") runGreet(); });

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

  $("scope-run").addEventListener("click", () => {
    const localX = changeValue();
    $("scope-output").textContent =
      "global x stays " + x + "  •  local x inside the function was " + localX;
  });

  const liveCounter = outerFunction();
  $("counter-run").addEventListener("click", () => {
    $("counter-output").textContent = "count = " + liveCounter();
  });

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