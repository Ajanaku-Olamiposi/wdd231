const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.innerHTML = `${today.getFullYear()}`;
const lastModified = document.querySelector("#lastmodified");
const date = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span>${new Intl.DateTimeFormat("en-US").format(date)}</span>`;

// document.querySelector('.console').addEventListener('click', function() {
//     document.getElementById('hiddenInput').focus();
// });

const buttons = [
    {
        sign: 'C',
        class: 'sig1'
    },
    {
        sign: '( )',
        class: 'sig2'
    },
    {
        sign: '%',
        class: 'sig2'
    },
    {
        sign: '/',
        class: 'sig2'
    },
    {
        sign: '7'
    },
    {
        sign: '8'
    },
    {
        sign: '9'
    },
    {
        sign: '*',
        class: 'sig2'
    },
    {
        sign: '4'
    },
    {
        sign: '5'
    },
    {
        sign: '6'
    },
    {
        sign: '-',
        class: 'sig2'
    },
    {
        sign: '1'
    },
    {
        sign: '2'
    },
    {
        sign: '3'
    },
    {
        sign: '+',
        class: 'sig2'
    },
    {
        sign: '+/-'
    },
    {
        sign: '0'
    },
    {
        sign: '.'
    },
    {
        sign: '=',
        class: 'sig3'
    },
]

const hiddenInput = document.querySelector('#hiddenInput');
const factors = document.querySelector('.factors');
const ans = document.querySelector('.ans');

buttons.forEach(button => {
    const factor = document.createElement('p');
    factor.textContent = button.sign;
    factor.classList.add(button.class);

    factor.addEventListener('click', function() {
        if (button.sign != '=' && button.sign != 'C'){
            hiddenInput.value += button.sign;
        }
        else if(button.sign == '='){
            try {
                const result = eval(hiddenInput.value);
                ans.textContent = result;
            } catch (error) {
                ans.textContent = 'Invalid expression';
            }
        }
        else{
            hiddenInput.value = ''
            ans.textContent = ''
        }
    });

    factors.appendChild(factor);
});