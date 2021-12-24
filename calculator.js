const result = document.querySelector('.result');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.calculator_button');
const calculator = document.querySelector('.calculator');
const invalidInput = document.querySelector('.error');
var toComputeVal = "";

const compute = userData =>{
    //calculating using switch
    switch(userData){
        // calculate and display result
        case "=":
            try{
                calc = eval(toComputeVal)
                // display.innerText = calc;
                localStorage.setItem('preValue', toComputeVal + '=' + calc );
                result.innerHTML = 
                `
                    ${localStorage.getItem('preValue')} <span class="d-block display">= ${calc}</span>
                `;
                toComputeVal = '';
                // result.textContent = toComputeVal + '=' + eval(toComputeVal);
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
                    ${localStorage.getItem('preValue')} <span class="d-block display">= ${toComputeVal}</span>
                `;
                console.log(result.innerText);
            }else{
                result.innerHTML = 
                `
                    ${localStorage.getItem('preValue')} <span class="d-block display">0</span>
                `;
            }   
            break;

        //to delete one character    
        case "AC":
            if(toComputeVal.length){
                toComputeVal = toComputeVal.slice(0, -1);
                result.innerHTML = 
                `
                    ${localStorage.getItem('preValue')} <span class="d-block display">= ${toComputeVal}</span>
                `;
                // display.innerText = toComputeVal;
                console.log(toComputeVal);
            }else{
                result.innerHTML = 
                    `
                        ${localStorage.getItem('preValue')} <span class="d-block display">0</span>
                    `;
            }            
            break;
        
                
        //display input number in ui
        default:
            toComputeVal += userData;
            result.innerHTML = 
                `
                    ${localStorage.getItem('preValue')} <span class="d-block display">${toComputeVal}</span>
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
            ${localStorage.getItem('preValue')} <span class="d-block display">${toComputeVal}</span>
        `;
}
