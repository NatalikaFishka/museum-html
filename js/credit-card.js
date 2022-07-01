class CreditCardNumber extends HTMLInputElement {
    constructor() {
        super();
        this.type = "text";
        this.addEventListener('input', () => this.value = this.format(this.value));
    }

    format(value) {
        let editedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = editedValue.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return editedValue
        }
    }
}

class CreditCardExpDate extends HTMLInputElement {
    constructor() {
        super();
        this.addEventListener('input', () => this.value = this.format(this.value));
        this.maxLength = Number(this.getAttribute('maxlength'));
        this.type = "number";
    }

    format(value) {
        let editedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, this.maxLength);
        return editedValue
    }
}

class CreditCardCVV extends HTMLInputElement {
    constructor() {
        super();
        this.type = "number";
        this.addEventListener('input', () => this.value = this.format(this.value));
    }

    format(value) {
        let editedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 4);
        return editedValue
    }
}

class CreditCardHolder extends HTMLInputElement {
    constructor() {
        super();
        this.type = "text";
        this.addEventListener('input', () => this.value = this.format(this.value));
    }

    format(value) {
        let editedValue = value.replace(/[0-9]/gi, '');
        return editedValue.toUpperCase();

    }
}


customElements.define('credit-card-number', CreditCardNumber, { extends: "input" });
customElements.define('credit-card-exp-date', CreditCardExpDate, { extends: "input" });
customElements.define('credit-card-cvc-cvv', CreditCardCVV, { extends: "input" });
customElements.define('credit-card-holder', CreditCardHolder, { extends: "input" });