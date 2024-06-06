// const About = document.getElementById('About');
// const detail = About.getBoundingClientRect() // get details of position of this container
// console.log(detail)

let allsections = document.querySelectorAll('.animatedSection');

const currentSection = () => {
    let screenH = window.innerHeight;
    allsections.forEach((section) => {
        const top = section.getBoundingClientRect().top; 
        if (top < screenH )
            section.classList.add('Active');
        else
            section.classList.remove('Active');
    })
}
window.addEventListener('scroll', currentSection);

// screen of calculater
const screen = document.getElementById('screen');
let sign = '';
let number1 = 0;

// A/C Button of Calculator
const acbutton = document.getElementById('btnClear');
acbutton.addEventListener('click', () => {
    handleDottAccess(false);
    memoryCleaner();
});

// number key of calculator
const numberClick = (e) => {
    screen.value += e.target.innerText;
}
const numberskey = document.querySelectorAll('.keys .btn');
numberskey.forEach(numbers => {
    numbers.addEventListener('click', numberClick);
});

// Dott button of calculator
const btndott = document.getElementById('btndott');
btndott.addEventListener('click', () => {
    if(screen.value !== '') {
        screen.value += '.';
        handleDottAccess(true)
    }
    else {
        screen.value += '0.';
        handleDottAccess(true)
    }
});
function handleDottAccess(option) {
    btndott.disabled = option;
}

// handle Zero 
const btnZero = document.querySelectorAll('.keys .btnZero');
btnZero.forEach(zero => {
    zero.addEventListener('click', (e) => {
        if(screen.value !== '')
        screen.value += e.target.innerText;
    });
});

// Operation Buttons of the Calculator
const btnOperation = document.querySelectorAll('.keys .btnOperation');

btnOperation.forEach(btns => {
    btns.addEventListener('click', (e) => {
        if(sign === "") {
            number1 = parseFloat(screen.value);
        }
        else {
            number1 = performCalculation(number1, parseFloat(screen.value), sign)
        }
        sign = e.target.innerText;
        screen.value = '';
        handleDottAccess(false);
    })
});

const btnAns = document.getElementById('btnAns');
btnAns.addEventListener('click', () => {
    const output = performCalculation(number1, parseFloat(screen.value), sign)
    memoryCleaner();
    handleDottAccess(false);
    screen.value = output;
})

function performCalculation(number1, number2, sign) {
    let output;
    switch(sign) {
        case '+':
            output = number1 + number2;
            break;
        case '-':
            output = number1 - number2;
            break;
        case 'x':
            output = number1 * number2;
            break;
        case '/':
            output = number1 / number2;
            break;
        case '%':
            output = number1 % number2;
            break;
        default:
            output = 0;
            break;
    }
    return output;
}

function memoryCleaner() {
    screen.value = '';
    number1 = 0;
    sign = '';
}

const btnBack = document.getElementById('btnRemove');
btnBack.addEventListener('click', () => {
    val = screen.value[screen.value.length - 1];
    screen.value = screen.value.substring(0, screen.value.length - 1);
    console.log(val);
    if(val == '.')
        handleDottAccess(false);
})