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
    const errorMessages = [
        "Hello!",
        "Error: Enter a number first!",
        "Error: Length exceeded!",
        "Error: No operator chosen!",
        "Error: Invalid divisor!",
        "Error: Enter a pair of numbers first!",
        "Error: Cannot calculate!",
        "Error!",
        "Cleared!",
        "Purged!",
    ];
    if (errorMessages.includes(resultDisplay.textContent) || errorMessages.includes(expressionDisplay.textContent)) {
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
    if ((!expressionDisplay.textContent.endsWith(operator) && calculator.operator !== operator) ||
        (!expressionDisplay.textContent.endsWith(operator) && calculator.operator !== operator) ||
        (!expressionDisplay.textContent.endsWith(operator) && calculator.operator !== operator) ||
        (!expressionDisplay.textContent.endsWith(operator) && calculator.operator !== operator)) {
        let temp = Array.from(expressionDisplay.textContent);
        temp.pop();
        expressionDisplay.textContent = temp.join("");
    }
    if (calculator.operator !== operator &&
        (calculator.operator !== "*" || operator !== "*") &&
        (calculator.operator !== "/" || operator !== "/")) {
        if (calculator.firstOperand !== "" &&
            calculator.secondOperand == "" &&
            calculator.result == "" &&
            calculator.operator == "") {
            calculator.operator = operator;
            logExpression(operator);
        }
        else if (calculator.firstOperand == "" &&
            calculator.secondOperand == "" &&
            calculator.result !== "" &&
            calculator.operator == "") {
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
    else if (calculator.firstOperand !== "" &&
        calculator.secondOperand == "" &&
        calculator.operator == "" &&
        calculator.result == "") {
        calculator.firstOperand = "";
        return handleError("NoOperatorChosen");
    }
    else {
        performOperation();
        logExpression("=");
        if (calculator.result == "undefined" || calculator.result == "NaN") {
            calculator.result = "";
            return;
        }
        else {
            resultDisplay.textContent = calculator.result;
        }
    }
}
function clearButtonClicked() {
    if (calculator.operator == "") {
        calculator.firstOperand = "";
    }
    else {
        calculator.secondOperand = "";
    }
    if (calculator.firstOperand == "" && calculator.secondOperand == "" && calculator.result !== "") {
        expressionDisplay.textContent = "";
        calculator.result = "";
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
    if (b == "" || b == 0 || b == "0" || b == ".") {
        handleError("InvalidDivisor");
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
            displayError("Error: Enter a number first!");
            break;
        case "InputLengthExceeded":
            displayError("Error: Length exceeded!");
            break;
        case "NoOperatorChosen":
            displayError("Error: No operator chosen!");
            break;
        case "InvalidDivisor":
            displayError("Error: Invalid divisor!");
            break;
        case "EmptyCalculatorObject":
            displayError("Error: Enter a pair of numbers first!");
            break;
        case "ResultLengthExceeded":
            displayError("Error: Cannot calculate!");
            break;
        default:
            displayError("Error!");
            break;
    }
}
function displayError(string) {
    expressionDisplay.textContent = "";
    changeFontSize("change");
    resultDisplay.textContent = string;
    setTimeout(() => {
        resultDisplay.textContent = "";
        expressionDisplay.textContent = "";
        changeFontSize("reset");
    }, 700);
}
function logExpression(operator) {
    if (operator == "=") {
        if (calculator.result == "undefined" || calculator.result == "NaN") {
            return;
        }
        else {
            expressionDisplay.append(`${resultDisplay.textContent}`);
            return;
        }
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
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
    switch (event.key) {
        case "0":
            inputBtnClicked("0");
            break;
        case "1":
            inputBtnClicked("1");
            break;
        case "2":
            inputBtnClicked("2");
            break;
        case "3":
            inputBtnClicked("3");
            break;
        case "4":
            inputBtnClicked("4");
            break;
        case "5":
            inputBtnClicked("5");
            break;
        case "6":
            inputBtnClicked("6");
            break;
        case "7":
            inputBtnClicked("7");
            break;
        case "8":
            inputBtnClicked("8");
            break;
        case "9":
            inputBtnClicked("9");
            break;
        case ".":
            inputBtnClicked(".");
    }
    switch (event.key) {
        case "+":
            handleOperatorClick("+");
            break;
        case "-":
            handleOperatorClick("-");
            break;
        case "*":
            handleOperatorClick("*");
            break;
        case "/":
            handleOperatorClick("/");
            break;
        case "%":
            percentageBtnClicked();
            break;
        case "=":
        case "Enter":
            equalsBtnClicked();
            break;
    }
    switch (event.key) {
        case "Backspace":
        case "Escape":
            clearButtonClicked();
            break;
        case "Delete":
            deleteButtonClicked();
            break;
    }
});
