class Calculator{
    constructor(prevOperandTextElement, currOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clear();       // clears display and set values to default when app starts
    }
  
    // clear the display and set values to default
    clear(){
        this.prevOperand = '';      // clearing current value
        this.currOperand = '';      // clearing previous value
        this.operation = undefined;     //clearing operation (eg. +, -, *, /, etc.)

    }

    // delete character 
    delete(){
        if(typeof(this.currOperand) != 'string')return;
        this.currOperand = this.currOperand.slice(0,-1);
    }

    // choose operation to be performed
    chooseOperation(operation){
        //  checking if current operand is empty and not updating ui of previous text element
        if(this.currOperand === '') return      // if true stops executing furthur 
        
        // make calculations of two value when second operation is clicked
        if(this.prevOperand !== ''){
            this.compute();
        }

        this.prevOperand = this.currOperand;
        this.currOperand = '';
        this.operation = operation;
    }

    // append numbers together
    appendDigits(number){
        // avoiding multiple '.'
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString();     //appending values or number in current operand
    }

    // formatting the digit (eg: 123,456,789)
    getDisplay(number){
        const stringNumber = number.toString();
        const integerNumber = parseFloat(stringNumber.split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
        let integerDisplay
        if(isNaN(integerNumber)){
            integerDisplay = '';
        }else {
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits : 0});
        }
        if(decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`;
        }else{
            return integerDisplay;
        }
    }

    // calculate given operands
    compute(){
        var computation = -1;
        const preValue = parseFloat(this.prevOperand);
        const currValue = parseFloat(this.currOperand);
        console.log("prev--", preValue, "-----curr--", currValue);
        // not calculating if either current operand or previous operand is NaN
        if(isNaN(currValue) || isNaN(preValue))return;

        switch(this.operation){
            case '+':
                computation = preValue + currValue;
                break;
            case '-':
                computation = preValue - currValue;
                break;
            case '*':
                computation = preValue * currValue;
                break;
            case '÷':
                computation = preValue / currValue;
                break;
            default:
                return;
        }
        this.currOperand = computation;
        this.prevOperand = '';
        this.operation = undefined;
    }

    // update ui
    updateUi(){
        this.currOperandTextElement.innerText = this.getDisplay(this.currOperand);
        if(this.operation != null){
            this.prevOperandTextElement.innerText = `${this.getDisplay(this.prevOperand)} ${this.operation}`;
        }else{
            this.prevOperandTextElement.innerText = '';
        }
    }
}


const prevOperandTextElement = document.querySelector('[data-previous-operand]');
const currOperandTextElement = document.querySelector('[data-current-operand]');
const numBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const calculator = new Calculator(prevOperandTextElement, currOperandTextElement);

// clicking numbers
numBtn.forEach(number => {
    number.addEventListener('click', () =>{
        calculator.appendDigits( number.innerText);
        calculator.updateUi();
    })
});

// clicking operations
operationBtn.forEach(operation => {
    operation.addEventListener('click', () =>{
        calculator.chooseOperation(operation.innerText);
        calculator.updateUi();
    })
});

// clicking equals
equalsBtn.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateUi();
});

// clicking clear
allClearBtn.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateUi();
})

// clicking delete
deleteBtn.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateUi();
})