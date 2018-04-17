// first number;
let newNumber = '';
// total;
let total = '';
let currentOperator = '';
// prevent use fraction twice;
let fractionFlag = true;


// show result;
function showResult(num) {
    const output = document.querySelector('.calc-result');
    output.value = num;
    total = '';
    newNumber = '';
    currentOperator = '';
    fractionFlag = true;
}


// count result;
function countResult(op) {
    const output = document.querySelector('.calc-result').value,
        firstNum = Number(output.split(op)[0]),
        secondNum = Number(output.split(op)[1]);
    
    
    
    console.log(firstNum + op + secondNum);
    
    // DO NOT DIVIDE BY ZERO!!
    if (secondNum === 0 && currentOperator === '/') {
        const error = 'DON\'T DIVIDE BY ZERO!!',
              outputField = document.querySelector('.calc-result').classList.add('error');
        showResult(error);
        return;
    }
    switch (op) {
        case '+':
            total = firstNum + secondNum;
            break;
        case '-':
            total = firstNum - secondNum;
            break;
        case '*':
            total = firstNum * secondNum;
            break;
        case '/':
            total = firstNum / secondNum;
            break;
    }
    showResult(total);
}
// reset output;
function resetOutput(operator) {
    const output = document.querySelector('.calc-result');
    if (newNumber === '') {
        newNumber = output.value;
        output.value += operator;
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
        currentOperator = currentEl;
        resetOutput(currentEl);
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
        e.target.nextSibling.value = '';
        newNumber = '';
        currentOperator = '';
        fractionFlag = true;
    }
    // clear last digit btn; ignore if nothing to clear;
    if (currentEl === 'C' && !checkResultValue()) {
        // check for error class;
        if (!resultField.classList.contains('error')) {
            // delete one character a time;
            // clear digits and fractals;
            let lastToRemove = resultField.value;
            resultField.value = lastToRemove.substring(0, lastToRemove.length - 1);
        } else {
            // clear error message;
            resultField.value = '';
            // delete error class;
            resultField.classList.remove('error');
            newNumber = '';
            currentOperator = '';
            fractionFlag = true;
        }
    }
}

/*
listeners
*/
// click every where on calculator;
document.querySelector('.calc-wrap').addEventListener('click', whatClicked);
