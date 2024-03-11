"use strict";
const expressionDisplay = document.querySelector("#expression");
const resultDisplay = document.querySelector("#result");
const buttons = document.querySelector("#button-container");
const MAX_INPUT_LENGTH = 13;
const MAX_RESULT_LENGTH = 14;
let calculator = {
    firstOperand: "",
    operator: "",
    secondOperand: "",
    result: "",
};
buttons.addEventListener("click", (event) => {
    const target = event.target;
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
    switch (target.id) {
        case "btn-add":
            handleOperatorClick("+");
            break;
        case "btn-subtract":
            handleOperatorClick("-");
            break;
        case "btn-multiply":
            handleOperatorClick("*");
            break;
        case "btn-divide":
            handleOperatorClick("/");
            break;
        case "btn-percentage":
            percentageBtnClicked();
            break;
        case "btn-equals":
            equalsBtnClicked();
            break;
    }
    switch (target.id) {
        case "btn-clear":
            clearButtonClicked();
            break;
        case "btn-delete":
            deleteButtonClicked();
            break;
    }
});
function inputBtnClicked(input) {
    if (resultDisplay.textContent === "Hello!" ||
        resultDisplay.textContent === "Enter a number first!" ||
        resultDisplay.textContent === "Length exceeded!" ||
        resultDisplay.textContent === "⚠" ||
        resultDisplay.textContent === "Enter a pair of numbers first!" ||
        resultDisplay.textContent === "Cannot calculate!" ||
        resultDisplay.textContent === "Error!") {
        return;
    }
    if (calculator.result !== "" && expressionDisplay.textContent !== "" && resultDisplay.textContent !== "") {
        calculator.result = "";
        expressionDisplay.textContent = "";
        resultDisplay.textContent = "";
    }
    if (calculator.operator == "") {
        if (calculator.firstOperand.length == MAX_INPUT_LENGTH) {
            handleError("InputLengthExceeded");
            calculator.firstOperand = "";
            return;
        }
        if (input === "." && calculator.firstOperand.includes(".")) {
            return;
        }
        calculator.firstOperand += input;
        resultDisplay.append(input);
        if (calculator.firstOperand.length > 9) {
            changeFontSize("change");
        }
    }
    else {
        if (calculator.secondOperand.length == MAX_INPUT_LENGTH) {
            handleError("InputLengthExceeded");
            calculator.secondOperand = "";
            return;
        }
        if (input === "." && calculator.secondOperand.includes(".")) {
            return;
        }
        calculator.secondOperand += input;
        resultDisplay.append(input);
    }
}
function handleOperatorClick(operator) {
    if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
        calculator.operator = operator;
        logExpression(operator);
    }
    else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result !== "") {
        calculator.firstOperand = calculator.result;
        calculator.result = "";
        calculator.operator = operator;
        expressionDisplay.textContent = "";
        logExpression(operator);
    }
    else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result == "") {
        handleError("NoInputOperation");
    }
    else {
        performOperation();
        calculator.firstOperand = calculator.result;
        calculator.result = "";
        calculator.operator = operator;
        logExpression(operator);
    }
}
function percentageBtnClicked() {
    if (calculator.firstOperand !== "" && calculator.secondOperand == "" && calculator.result == "") {
        calculator.firstOperand = `${percentage(calculator.firstOperand)}`;
        resultDisplay.textContent = calculator.firstOperand;
    }
    else if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result == "") {
        handleError("NoInputOperation");
    }
    else if (calculator.firstOperand !== "" && calculator.secondOperand !== "" && calculator.result == "") {
        calculator.secondOperand = `${percentage(calculator.secondOperand)}`;
        resultDisplay.textContent = calculator.secondOperand;
    }
    else {
        calculator.firstOperand = calculator.result;
        calculator.result = "";
        calculator.firstOperand = `${percentage(calculator.firstOperand)}`;
        expressionDisplay.textContent = "";
        resultDisplay.textContent = calculator.firstOperand;
    }
}
function equalsBtnClicked() {
    if (calculator.firstOperand == "" &&
        calculator.secondOperand == "" &&
        calculator.operator == "" &&
        calculator.result == "") {
        return handleError("EmptyCalculatorObject");
    }
    else {
        performOperation();
        logExpression("=");
        resultDisplay.textContent = calculator.result;
    }
}
function clearButtonClicked() {
    if (calculator.operator == "") {
        calculator.firstOperand = "";
    }
    else {
        calculator.secondOperand = "";
    }
    if (calculator.firstOperand == "" && calculator.secondOperand == "") {
        expressionDisplay.textContent = "";
    }
    changeFontSize("reset");
    resultDisplay.textContent = "Cleared!";
    setTimeout(() => (resultDisplay.textContent = ""), 600);
}
function deleteButtonClicked() {
    calculator = {
        firstOperand: "",
        operator: "",
        secondOperand: "",
        result: "",
    };
    changeFontSize("reset");
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "Purged!";
    setTimeout(() => (resultDisplay.textContent = ""), 600);
}
function add(a, b) {
    return parseFloat((+a + +b).toFixed(10));
}
function subtract(a, b) {
    return parseFloat((+a - +b).toFixed(10));
}
function multiply(a, b) {
    return parseFloat((+a * +b).toFixed(10));
}
function divide(a, b) {
    if (b == 0 || b == "0") {
        handleError("DivisionByZero");
        return;
    }
    return parseFloat((+a / +b).toFixed(10));
}
function percentage(a) {
    return +a / 100;
}
function performOperation() {
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
    if (calculator.result.length > 9) {
        changeFontSize("change");
    }
    if (calculator.result.length > MAX_RESULT_LENGTH) {
        handleError("ResultLengthExceeded");
    }
}
function handleError(error) {
    switch (error) {
        case "NoInputOperation":
            displayError("Enter a number first!");
            break;
        case "InputLengthExceeded":
            displayError("Length exceeded!");
            break;
        case "DivisionByZero":
            displayError("⚠");
            break;
        case "EmptyCalculatorObject":
            displayError("Enter a pair of numbers first!");
            break;
        case "ResultLengthExceeded":
            displayError("Cannot calculate!");
            break;
        default:
            displayError("Error!");
            break;
    }
}
function displayError(string) {
    expressionDisplay.textContent = "";
    (resultDisplay.textContent = string),
        setTimeout(() => {
            resultDisplay.textContent = "";
            expressionDisplay.textContent = "";
        }, 700);
}
function logExpression(operator) {
    if (operator == "=") {
        expressionDisplay.append(`${resultDisplay.textContent}`);
        return;
    }
    expressionDisplay.append(`${resultDisplay.textContent}${operator}`);
    resultDisplay.textContent = "";
}
function changeFontSize(string) {
    if (string == "change") {
        resultDisplay.style.fontSize = "30px";
        return;
    }
    else {
        resultDisplay.style.fontSize = "";
    }
}
document.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("load", () => {
    resultDisplay.textContent = "Hello!";
    setTimeout(() => (resultDisplay.textContent = ""), 700);
});
