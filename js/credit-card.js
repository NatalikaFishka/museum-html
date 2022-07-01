const creditCardNumber = document.querySelector("#credit-card-number");
const creditCardDateAndCVV = document.querySelectorAll(".credit-card-date-and-cvv");
const creditCardHolder = document.querySelector("#credit-card-holder");

creditCardNumber.addEventListener("input", formatCreditCardNumber);
creditCardHolder.addEventListener("input", formatCreditCardHolder);
creditCardDateAndCVV.forEach(input => input.addEventListener("input", formatExpDateAndCVV));

function formatCreditCardNumber() {
    let inputValue = creditCardNumber.value;

    let editedValue = inputValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = editedValue.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
        creditCardNumber.value = parts.join(' ');
    } else {
        creditCardNumber.value = editedValue;
    }
}

function formatExpDateAndCVV(e) {
    let valueInput = e.target.value;
    let maxLength = Number(e.target.getAttribute("maxlength"));

    let editedValue = valueInput.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, maxLength);
    e.target.value = editedValue;
}

function formatCreditCardHolder() {
    creditCardHolder.value = creditCardHolder.value.replace(/[0-9]/gi, '').toUpperCase();
}