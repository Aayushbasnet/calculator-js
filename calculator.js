const result = document.querySelector('.result');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.calculator_button');
const calculator = document.querySelector('.calculator');
const invalidInput = document.querySelector('.error');
const reset = document.querySelector('.reset');
var toComputeVal = "";

const compute = userData =>{
    //calculating using switch
    switch(userData){
        // calculate and display result
        case "=":
            try{
                if(toComputeVal.length){
                    calc = eval(toComputeVal)
                    // display.innerText = calc;
                    localStorage.setItem('preValue', toComputeVal + '=' + calc );
                    result.innerHTML = 
                    `
                        ${localStorage.getItem('preValue')} <span class="d-block display text-dark">= ${calc}</span>
                    `;
                    toComputeVal = '';
                }
            }catch(err){
                console.log(err.message);
                if(invalidInput.classList.contains('d-none')){
                    invalidInput.classList.remove('d-none');
                }
            }
            break;

        //to clear screen
        case "C":
            if(toComputeVal.length){
                // display.innerText = '';
                toComputeVal = "";
                result.innerHTML = 
                `
                    00 <span class="d-block display text-dark">00</span>
                `;
                console.log(result.innerText);
            }else{
                result.innerHTML = 
                `
                    00 <span class="d-block display text-dark">00</span>
                `;
            }   
            break;

        //to delete one character    
        case "AC":
            if(toComputeVal.length){
                toComputeVal = toComputeVal.slice(0, -1);
                result.innerHTML = 
                `
                    ${localStorage.getItem('preValue')} <span class="d-block display text-dark">${toComputeVal}</span>
                `;
                // display.innerText = toComputeVal;
                console.log(toComputeVal);
            }else{
                result.innerHTML = 
                    `
                        ${localStorage.getItem('preValue')} <span class="d-block display text-dark">00</span>
                    `;
            }            
            break;
        
                
        //display input number in ui
        default:
            toComputeVal += userData;
            result.innerHTML = 
                `
                    ${localStorage.getItem('preValue')} <span class="d-block display text-dark">${toComputeVal}</span>
                `;
            // display.innerText = toComputeVal;
            console.log(toComputeVal);

    }
};

calculator.addEventListener('click', e =>{
    //getting user value from buttons
    userData = e.target.innerText;
    //computing the user given value
    compute(userData);
    
});

if(localStorage.getItem('preValue')){
    result.innerHTML = 
        `
            ${localStorage.getItem('preValue')} <span class="d-block display text-dark">00</span>
        `;
}

reset.addEventListener('click', () =>{
    localStorage.setItem('preValue', 00);
    result.innerHTML = 
        `
        ${localStorage.getItem('preValue')}<span class="d-block display text-dark">00</span>
        `;
})
