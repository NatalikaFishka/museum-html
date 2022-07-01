const youngControl = document.querySelector(".young");
const youngNumber = document.querySelector(".young input[type='number']");
const youngNumberHidden = document.querySelector(".young input[type='hidden']");

const seniorControl = document.querySelector(".senior");
const seniorNumber = document.querySelector(".senior input[type='number']");
const seniorNumberHidden = document.querySelector(".senior input[type='hidden']");

const total = document.querySelector('.total-price span');

total.innerText = getTotal();

youngControl.addEventListener("click", handleControl);
seniorControl.addEventListener("click", handleControl);

function handleControl(event) {

    let clickedElement = event.target;
    let clickedControlGroup = getControlGroup(clickedElement.parentNode.classList);

    if (clickedElement.classList.contains("add")) {
        clickedControlGroup.numberInput.stepUp();
        clickedControlGroup.numberInput.dispatchEvent(new Event("change"));
    } else if (clickedElement.classList.contains("subtract")) {
        clickedControlGroup.numberInput.stepDown();
        clickedControlGroup.numberInput.dispatchEvent(new Event("change"));
    }

    clickedControlGroup.hiddenInput.value = clickedControlGroup.numberInput.value;
    total.innerText = getTotal();
}

function getControlGroup(parentClass) {
    if (parentClass.contains("young")) {
        return {
            numberInput: youngNumber,
            hiddenInput: youngNumberHidden
        }
    } else if (parentClass.contains("senior")) {
        return {
            numberInput: seniorNumber,
            hiddenInput: seniorNumberHidden
        }
    } else return null
}

function getTotal() {

    let youngTicketCost = 20;
    let seniorTicketCost = 10;

    return youngNumber.value * youngTicketCost + seniorNumber.value * seniorTicketCost;
}