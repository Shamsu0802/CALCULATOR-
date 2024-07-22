let displayValue = '0';
let errorOccured = false;

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function appendToDisplay(val) {
    if (errorOccured) {
        clearDisplay();
        errorOccured = false;
    }

    // Check if the entered value is valid
    if (isValidInput(val)) {
        // Check for consecutive operators or invalid leading operators
        if (isInvalidOperatorSequence(val)) {
            displayValue = 'Error';
            errorOccured = true;
            updateDisplay();
            return;
        }

        switch (val) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(val);
                break;
            case '.':
                handleDecimal();
                break;
            default:
                if (displayValue === '0' && val !== '.') {
                    displayValue = val;
                } else {
                    displayValue += val;
                }
                updateDisplay();
        }
    } else {
        displayValue = 'Error';
        errorOccured = true;
        updateDisplay();
    }
}

function isValidInput(val) {
    let validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let validOperators = ['+', '-', '*', '/', '.'];

    return validNumbers.includes(val) || validOperators.includes(val);
}

function isInvalidOperatorSequence(val) {
    let lastChar = displayValue[displayValue.length - 1];
    let operators = ['+', '-', '*', '/'];

    // Check if the last character and the current input are both operators
    if (operators.includes(lastChar) && operators.includes(val)) {
        return true;
    }

    // Check if the displayValue is 'Error' and the current input is an operator
    if (displayValue === 'Error' && operators.includes(val)) {
        return true;
    }

    // Check if the first character is an operator (except '-')
    if (displayValue === '0' && operators.includes(val) && val !== '-') {
        return true;
    }

    return false;
}

function handleOperator(operator) {
    let lastChar = displayValue[displayValue.length - 1];
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        displayValue = displayValue.slice(0, -1) + operator;
    } else {
        displayValue += operator;
    }
    updateDisplay();
}

function handleDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    let operators = ['+', '-', '*', '/'];
    let lastChar = displayValue[displayValue.length - 1];

    if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1); // Remove the last operator
    }

    try {
        displayValue = eval(displayValue).toString();
        if (displayValue === 'Infinity' || displayValue === '-Infinity' || displayValue === 'NaN') {
            displayValue = 'Error';
            errorOccured = true;
        }
    } catch (error) {
        displayValue = 'Error';
        errorOccured = true;
    }

    updateDisplay();
}

// Adding event listeners for number buttons (0-9)
for (let i = 0; i <= 9; i++) {
    document.getElementById(`${i}`).addEventListener('click', () => {
        appendToDisplay(i.toString());
    });
}

// Adding event listeners for operator buttons (+, -, *, /)
let operatorButtons = ['+', '-', '*', '/'];
operatorButtons.forEach(op => {
    document.getElementById(op).addEventListener('click', () => {
        appendToDisplay(op);
    });
});

// Adding event listener for decimal point (.)
document.getElementById('decimal').addEventListener('click', () => {
    appendToDisplay('.');
});

// Adding event listener for clear button (C)
document.getElementById('clear').addEventListener('click', clearDisplay);

// Adding event listener for equal button (=)
document.getElementById('equal').addEventListener('click', calculate);
