// first number;
let newNumber = '';
// total;
let total = '';
let currentOperator = '';
let fractionFlag = true;


// show result;
function showResult(num) {
    const output = document.querySelector('.calc-result');
    output.value = num;
    total = '';
    newNumber = '';
    currentOperator = '';
    fractionFlag = true;
    document.querySelector('.activeOperator').classList.remove('activeOperator');
}


// count result;
function countResult(op) {
    const output = document.querySelector('.calc-result').value;
    const secNum = Number(output);
    newNumber = Number(newNumber);
    // DO NOT DIVIDE BY ZERO!!
    if (secNum === 0 && currentOperator === '/') {
        const error = 'DON\'T DIVIDE BY ZERO!!';
        showResult(error);
        return;
    }
    switch (op) {
        case '+':
            total = newNumber + secNum;
            break;
        case '-':
            total = newNumber - secNum;
            break;
        case '*':
            total = newNumber * secNum;
            break;
        case '/':
            total = newNumber / secNum;
            break;
    }
    showResult(total);
}
// current operator; set bgc for current operator button;
function activeOperator(e) {
    e.target.classList.add('activeOperator');
}


// reset output;
function resetOutput() {
    const output = document.querySelector('.calc-result');
    if (newNumber === '') {
        newNumber = output.value;
        output.value = '';
    } else {
        return;
    }
}
// refresh output; append clicked digits to result field;
function refreshOutput(el) {
    let resultField = document.querySelector('.calc-result');
    resultField.value += el;
}
// output empty?
const checkResultValue = function () {
    const resultField = document.querySelector('.calc-result').value;
    if (resultField === '') {
        return true;
    } else {
        return false;
    }
}
// clicked element; Do something depending on what is clicked;
function whatClicked(e) {
    const digitBtns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        mathOperators = ['+', '-', '*', '/'],
        equalOperator = '=',
        currentEl = e.target.value,
        currentNumber = parseInt(currentEl),
        resultField = document.querySelector('.calc-result');


    // digit clicked;
    if (digitBtns.indexOf(currentNumber) != -1) {
        // yes, append digit to the end;
        let digit = currentEl;
        refreshOutput(digit);
    }
    // math operator clicked;
    if (mathOperators.indexOf(currentEl) != -1) {
        if (checkResultValue()) {
            return;
        }
        if (checkResultValue() && newNumber != '') {
            // no dogits in result field output;
            currentOperator = currentEl;
            activeOperator(e);
            resetOutput(currentEl);
        } else {
            // at least one digit exist in result field output;
            currentOperator = currentEl;
            activeOperator(e);
            resetOutput(currentEl);
        }
    }
    // fraction operator;
    if (currentEl === '.' && !checkResultValue()) {
        if (fractionFlag) {
            refreshOutput(currentEl);
            fractionFlag = false;
        }
    }
    if (currentEl === '.' && checkResultValue()) {
        if (fractionFlag) {
            // if result field empty add zero before fractal;
            resultField.value += 0 + currentEl;
            fractionFlag = false;
        }
    }
    // equal operator;
    if (currentEl === '=') {
        // ignore if nothing to count;
        if (newNumber === '' || checkResultValue()) {
            return;
        } else {
            countResult(currentOperator);
        }
    }
    // clear all btn; RESET Calculator;
    if (currentEl === 'CA') {
        if (currentOperator != '') {
            document.querySelector('.activeOperator').classList.remove('activeOperator');
        }
        e.target.nextSibling.value = '';
        newNumber = '';
        currentOperator = '';
        fractionFlag = true;
    }
    // clear last digit btn; ignore if nothing to clear;
    if (currentEl === 'C' && !checkResultValue()) {
        if (!isNaN(resultField.value)) {
            // clear digits and fractals;
            console.log(isNaN(resultField.value));
            let lastToRemove = resultField.value;
            resultField.value = lastToRemove.substring(0, lastToRemove.length - 1);
        } else {
            // clear error message;
            resultField.value = '';
            newNumber = '';
            currentOperator = '';
            fractionFlag = true;
        }
    }
    if (currentEl === 'C' && currentOperator != '') {
        document.querySelector('.activeOperator').classList.remove('activeOperator');
    }
}



/*
listeners
*/
// click every where on calculator;
document.querySelector('.calc-wrap').addEventListener('click', whatClicked);
