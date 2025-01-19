// script.js

// Variables to store calculator state
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Select elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => handleButtonPress(button));
});

clearButton.addEventListener("click", clearCalculator);
equalsButton.addEventListener("click", evaluate);

// Handle button press
function handleButtonPress(button) {
  const value = button.dataset.value;

  if (button.classList.contains("operator")) {
    setOperator(value);
  } else if (value === ".") {
    appendDecimal();
  } else {
    appendNumber(value);
  }
}

// Display a number
function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

// Handle decimal
function appendDecimal() {
  if (shouldResetDisplay) {
    display.textContent = "0.";
    shouldResetDisplay = false;
  } else if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

// Set operator
function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = parseFloat(display.textContent);
  currentOperator = operator;
  shouldResetDisplay = true;
}

// Evaluate the operation
function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = parseFloat(display.textContent);
  display.textContent = roundResult(
    operate(currentOperator, firstOperand, secondOperand)
  );
  currentOperator = null;
}

// Clear calculator
function clearCalculator() {
  display.textContent = "0";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

// Perform math operations
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return null;
  }
}

// Round result to avoid long decimals
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}
