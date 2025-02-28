// OPERATOR FUNCTIONS:

function add (n1, n2) {return n1 + n2}
function sub (n1, n2) {return n1 - n2}
function mul (n1, n2) {return n1 * n2}
function div (n1, n2) {return n1 / n2}

// CALLING FUNCTION:

function operate (n1, operator, n2) {
    n1 = parseNum (n1)
    n2 = parseNum (n2)
    if (operator === '+') result = add(n1, n2)
    if (operator === '-') result = sub(n1, n2)
    if (operator === '*') result = mul(n1, n2)
    if (operator === '/' && n2 === 0) return 'Error'
    if (operator === '/') result = div(n1, n2)
    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(2))
    }
    return result   
}

function parseNum(input) { // Converts str into int or float
    if (typeof input === 'number') return input
    return input.includes('.') ? parseFloat(input) : parseInt(input)
} 

// VARIABLE DECLARATION:

let input = ''
let result = ''
let n1 = ''
let operator = ''
let n2 = ''
let keysArr = []
let operatorsArr = []

// FUNCTION TO CLEAR DISPLAY:

const display = document.querySelector ('#display')

const allClear = document.querySelector ('#allClear')
allClear.addEventListener ('click', function () {
    clearDisplay ()
})
function clearDisplay () { // Resets the calculator
    input = ''
    n1 = ''
    operator = ''
    n2 = ''
    result = ''
    display.innerText = 0
}

const clear = document.querySelector ('#clear')
clear.addEventListener ('click', function () {
    clearLast ()
})
function clearLast () { // Erases last input
    input = input.slice (0, -1)
    display.innerText = input || '0'  
}

// FUNCTION TO POPULATE DISPLAY:

const keys = document.querySelectorAll ('.key')
keys.forEach (key => {
    const value = key.getAttribute ('data-value')
    keysArr.push(value)
    key.addEventListener ('click', function () {
      appendToDisplay (value)
    })
})
const operators = document.querySelectorAll ('.operator')
operators.forEach (operator => {
    const value = operator.getAttribute ('data-value')
    operatorsArr.push(value)
    operator.addEventListener ('click', function () {
        appendToDisplay (value)
    })
})
const equals = document.querySelector ('.equals')
const value = equals.getAttribute ('data-value')
equals.addEventListener ('click', function () {
    appendToDisplay (value)
})

// EXECUTE CALCULATION:

function appendToDisplay (value) { 
    if (keysArr.includes(value)) {
        if (value === '.' && (input.includes('.') || input === '')) return
        if (n1 === result && result !== '' && operator === '') {
            result = ''
            n1 = ''
            input += value
            display.innerText = input
            return
        }
        input += value
        display.innerText = input
        return
    }
    if (value === '=' && (n1 !== '' && operator !== '' && input !== '')) {
        n2 = input
        result = operate (n1, operator, n2)
        display.innerText = result
        n1 = result
        operator = ''
        n2 = ''
        input = ''
        return
    }
    if (operatorsArr.includes(value)) {
        if (n1 === '' && input !== '') {
            operator = value
            n1 = input
            input = ''
            return
        }
        if (n1 === 'Error') return clearDisplay ()
        if (n1 !== '' && input === '') return operator = value
        if (n1 !== '' && input !== '') {
            n2 = input
            result = operate (n1, operator, n2)
            display.innerText = result
            n1 = result
            operator = value
            n2 = ''
            input = ''
            return
        }
    }
}

