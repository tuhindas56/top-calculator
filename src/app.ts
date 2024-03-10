const buttons: HTMLElement = document.querySelector("#button-container") as HTMLElement;
const MAX_INPUT_LENGTH = 13;
const MAX_RESULT_LENGTH = 14;
let calculator = {
  firstOperand: "",
  operator: "",
  secondOperand: "",
  result: "",
};

buttons.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  // Input buttons
  switch (target.id) {
    case "btn-zero":
      inputBtnClicked("0");
      break;
    case "btn-one":
      inputBtnClicked("1");
      break;
    case "btn-two":
      inputBtnClicked("2");
      break;
    case "btn-three":
      inputBtnClicked("3");
      break;
    case "btn-four":
      inputBtnClicked("4");
      break;
    case "btn-five":
      inputBtnClicked("5");
      break;
    case "btn-six":
      inputBtnClicked("6");
      break;
    case "btn-seven":
      inputBtnClicked("7");
      break;
    case "btn-eight":
      inputBtnClicked("8");
      break;
    case "btn-nine":
      inputBtnClicked("9");
      break;
    case "btn-dot":
      inputBtnClicked(".");
  }

  // Operation buttons
  switch (target.id) {
    case "btn-add":
      addBtnClicked();
      break;
    case "btn-subtract":
      subtractBtnClicked();
      break;
    case "btn-multiply":
      multiplyBtnClicked();
      break;
    case "btn-divide":
      divideBtnClicked();
      break;
    case "btn-percentage":
      percentageBtnClicked();
      break;
    case "btn-equals":
      equalsBtnClicked();
      break;
  }
});

// Button clicked functions
function inputBtnClicked(input: string) {
  if (calculator.result !== "") {
    calculator.result = "";
  }

  if (calculator.operator == "") {
    if (calculator.firstOperand.length == MAX_INPUT_LENGTH) {
      handleError("InputLengthExceeded");
      return;
    }
    if (input === "." && calculator.firstOperand.includes(".")) {
      return;
    }
    calculator.firstOperand += input;
  } else {
    if (calculator.firstOperand.length == MAX_INPUT_LENGTH) {
      handleError("InputLengthExceeded");
      return;
    }
    if (input === "." && calculator.secondOperand.includes(".")) {
      return;
    }
    calculator.secondOperand += input;
  }
}

function addBtnClicked() {
  if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
    calculator.operator = "+";
  } else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result !== "") {
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "+";
  } else {
    operate();
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "+";
  }
}

function subtractBtnClicked() {
  if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
    calculator.operator = "-";
  } else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result !== "") {
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "-";
  } else {
    operate();
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "-";
  }
}

function multiplyBtnClicked() {
  if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
    calculator.operator = "*";
  } else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result !== "") {
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "*";
  } else {
    operate();
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "*";
  }
}

function divideBtnClicked() {
  if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
    calculator.operator = "/";
  } else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result !== "") {
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "/";
  } else {
    operate();
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.operator = "/";
  }
}

function percentageBtnClicked() {
  if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
    calculator.firstOperand = `${percentage(calculator.firstOperand)}`;
  } else {
    calculator.firstOperand = calculator.result;
    calculator.result = "";
    calculator.firstOperand = `${percentage(calculator.firstOperand)}`;
  }
}

function equalsBtnClicked() {
  if (
    calculator.firstOperand == "" &&
    calculator.secondOperand == "" &&
    calculator.operator == "" &&
    calculator.result == ""
  ) {
    return handleError("EmptyCalculatorObject");
  } else {
    operate();
  }
}

// Math functions
function add(a: number | string, b: number | string): number {
  return parseFloat((+a + +b).toFixed(10));
}

function subtract(a: number | string, b: number | string): number {
  return parseFloat((+a - +b).toFixed(10));
}

function multiply(a: number | string, b: number | string): number {
  return parseFloat((+a * +b).toFixed(10));
}

function divide(a: number | string, b: number | string) {
  if (b == 0 || b == "0") {
    handleError("DivisionByZero");
    return;
  }
  return parseFloat((+a / +b).toFixed(10));
}

function percentage(a: number | string) {
  return +a / 100;
}

function operate() {
  switch (calculator.operator) {
    case "+":
      calculator.result = `${add(calculator.firstOperand, calculator.secondOperand)}`;
      calculator.firstOperand = "";
      calculator.secondOperand = "";
      calculator.operator = "";
      break;
    case "-":
      calculator.result = `${subtract(calculator.firstOperand, calculator.secondOperand)}`;
      calculator.firstOperand = "";
      calculator.secondOperand = "";
      calculator.operator = "";
      break;
    case "*":
      calculator.result = `${multiply(calculator.firstOperand, calculator.secondOperand)}`;
      calculator.firstOperand = "";
      calculator.secondOperand = "";
      calculator.operator = "";
      break;
    case "/":
      calculator.result = `${divide(calculator.firstOperand, calculator.secondOperand)}`;
      calculator.firstOperand = "";
      calculator.secondOperand = "";
      calculator.operator = "";
      break;
  }

  if (calculator.result.length > MAX_RESULT_LENGTH) {
    handleError("ResultLengthExceeded");
  }
}

// Error handling function
function handleError(error: string) {
  error == "InputLengthExceeded"
    ? console.log("LENGTH EXCEEDED!!")
    : error == "DivisionByZero"
    ? console.log("Cannot divide by zero!")
    : error == "EmptyCalculatorObject"
    ? console.log("Enter a pair of numbers first!")
    : error == "ResultLengthExceeded"
    ? console.log("Cannot calculate!")
    : console.log("ERROR!");
}
