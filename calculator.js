const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.calculator_button');
const calculator = document.querySelector('.calculator');
const invalidInput = document.querySelector('.error');
var toComputeVal = "";

const compute = userData =>{
    switch(userData){
        case "C":
            if(toComputeVal.length){
                result.innerText = '';
                toComputeVal = "";
                console.log(result.innerText);
            }else{
                result.innerText = '0';
            }
            break;
            
        case "AC":
            if(toComputeVal.length){
                toComputeVal = toComputeVal.slice(0, -1);
                result.innerText = toComputeVal;
                console.log(toComputeVal);
            }else{
                result.innerText = '0';
            }            
            break;
        
        case "=":
            try{
                console.log(eval(toComputeVal));
            }catch(err){
                console.log(err.message);
                if(invalidInput.classList.contains('d-none')){
                    invalidInput.classList.remove('d-none');
                }
            }
            break;

        default:
            toComputeVal += userData;
            result.innerText = toComputeVal;
            console.log(toComputeVal);

    }
};

calculator.addEventListener('click', e =>{
    //getting user value from buttons
    userData = e.target.innerText;
    //computing the user given value
    compute(userData);
    
});
