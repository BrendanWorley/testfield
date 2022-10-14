
const dividend1 = document.querySelector('#digit_1_1');
const dividend2 = document.querySelector('#digit_1_2');
const dividend3 = document.querySelector('#digit_1_3');
const splitter1 = document.querySelector('#digit_1_4');
const quotient1 = document.querySelector('#digit_2_4');
const quotient2 = document.querySelector('#digit_2_5');
const quotient3 = document.querySelector('#digit_2_6');
const remainder1 = document.querySelector('#digit_7_3');

const line_1 = document.querySelector('.line_1');
const line_2 = document.querySelector('.line_2');
const line_3 = document.querySelector('.line_3');
const line_4 = document.querySelector('.line_4');
const line_5 = document.querySelector('.line_5');
const line_6 = document.querySelector('.line_6');
const line_7 = document.querySelector('.line_7');

let dividend = Number(dividend1.value) * 100 + Number(dividend2.value) * 10 + Number(dividend3.value);
let splitter = Number(splitter1.value);
let quotient = Number(quotient1.value) * 100 + Number(quotient2.value) * 10 + Number(quotient3.value);
let remainder = Number(remainder1.value);

console.log(dividend);
console.log(splitter);
console.log(quotient);
console.log(remainder);

let correctQuotient = Math.floor(dividend / splitter);
console.log("correct Quotient:", correctQuotient);

let correctRemainder = dividend % splitter;
console.log("correct Remainder", correctRemainder);

const launchButton = document.querySelector('.check');
const refreshButton = document.querySelector('.refresh');
const displayResult = document.querySelector('.result');
const container = document.querySelector('.conatiner');
const writeButton = document.querySelector('.write');




writeButton.addEventListener('click', write);
console.log(dividend1.value.length);


    line_1.addEventListener('click', (e) => {
        e.target.addEventListener('click', (event) => {
            event.target.value = Math.floor(Math.random(9) * 10); 
                
        }); 

    });
    
    line_2.addEventListener('click', (e) => {
        e.target.addEventListener('change', (event) => {
            if (event.target.value.length >= 2) {
                alert('Можно ввести только один символ!');
            } 

        });
    });
    line_3.addEventListener('click', (e) => {
        e.target.addEventListener('change', (event) => {
            if (event.target.value.length >= 2) {
                alert('Можно ввести только один символ!');
            } 

        });
    });
    line_4.addEventListener('click', (e) => {
        e.target.addEventListener('change', (event) => {
            if (event.target.value.length >= 2) {
                alert('Можно ввести только один символ!');
            } 

        });
    });
    line_5.addEventListener('click', (e) => {
        e.target.addEventListener('change', (event) => {
            if (event.target.value.length >= 2) {
                alert('Можно ввести только один символ!');
            } 

        });
    });
    line_6.addEventListener('click', (e) => {
        e.target.addEventListener('change', (event) => {
            if (event.target.value.length >= 2) {
                alert('Можно ввести только один символ!');
            } 

        });
    });
    line_7.addEventListener('click', (e) => {
        e.target.addEventListener('change', (event) => {
            if (event.target.value.length >= 2) {
                alert('Можно ввести только один символ!');
            } 

        });
    });


function write() {
    location.reload();
}

function quotientCheck() {
    
    if (quotient3.value === "x") {        
        quotient3.value = quotient2.value;
        quotient2.value = quotient1.value;
        quotient1.value = "0";
    }
    if (quotient3.value === ' ' || quotient3.value === '') {
        quotient3.style.border = "4px red solid";
    }
    
}


quotient2.addEventListener('change', quotientCheck); 
quotient3.addEventListener('change', quotientCheck);

function divisionCheck() {
    
    if (quotient === correctQuotient && remainder === correctRemainder) {
        displayResult.textContent = "Молодец!";
        displayResult.style.backgroundColor = "rgba(93, 156, 55, 1)";
    } else {
        displayResult.textContent = "Думай еще";
        displayResult.style.backgroundColor = "red";
        quotient3.style.border = "4px red solid";
        
        
    }
}

launchButton.addEventListener('click', divisionCheck);


function refresh() {
    console.log("Проверка кнопки");
    launchButton.style.visibility = 'hidden';
    const allDigits = document.querySelectorAll('.figure');
    for (let i = 0; i < allDigits.length; i++) {
        allDigits[i].value = "";
    }   
    displayResult.textContent = ''; 
    displayResult.style.backgroundColor = "rgba(233, 227, 179, 1)"; 
    
}

refreshButton.addEventListener('click', refresh);