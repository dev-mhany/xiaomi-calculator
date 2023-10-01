let currentInput = "";
let currentOperation = "";
let currentResult = "";

function buttonClick(value) {
    if (["+", "-", "*", "/"].includes(value)) {
        if (currentResult) {
            currentInput = currentResult;
            currentResult = "";
        }
        currentOperation = value;
    } else if (value === "=") {
        switch (currentOperation) {
            case "+":
                currentResult = parseFloat(currentResult) + parseFloat(currentInput);
                break;
            case "-":
                currentResult = parseFloat(currentInput) - parseFloat(currentResult);
                break;
            case "*":
                currentResult = parseFloat(currentResult) * parseFloat(currentInput);
                break;
            case "/":
                currentResult = parseFloat(currentInput) / parseFloat(currentResult);
                break;
        }
        currentInput = "";
        currentOperation = "";
    } else if (value === "DEL") {
        if (currentResult) {
            currentResult = currentResult.slice(0, -1);
        } else if (currentOperation) {
            currentOperation = "";
        } else if (currentInput) {
            currentInput = currentInput.slice(0, -1);
        }
    } else if (value === "AC") {
        currentInput = "";
        currentOperation = "";
        currentResult = "";
    } else {
        if (currentOperation) {
            currentResult += value;
        } else {
            currentInput += value;
        }
    }

    document.getElementById('result').value = currentInput + currentOperation + currentResult;
}

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function() {
        buttonClick(this.innerText);
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        buttonClick(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        buttonClick(key);
    } else if (key === 'Backspace') {
        buttonClick('DEL');
    } else if (key === 'Escape') {
        buttonClick('AC');
    } else if (key === 'Enter') {
        buttonClick('=');
    }
});

document.getElementById('ac').addEventListener('click', function() {
    currentInput = "";
    currentOperation = "";
    currentResult = "";
    document.getElementById('result').value = "";
});
