const urlParams = new URLSearchParams(window.location.search);
const young = urlParams.get('young');
const senior = urlParams.get('senior');
const exhibitionType = urlParams.get('exhibition-type');

const youngControlInputs = document.querySelectorAll(".young input")
const seniorControlInputs = document.querySelectorAll(".senior input")

const youngTotalOverviewAmount = document.querySelector(".book-tickets__amount-total.young");
const seniorTotalOverviewAmount = document.querySelector(".book-tickets__amount-total.senior");

const youngTotalOverviewPrice = document.querySelector(".book-tickets__total-cost.young span");
const seniorTotalOverviewPrice = document.querySelector(".book-tickets__total-cost.senior span");

const ticketType = document.querySelector("select");

const overviewTicketType = document.querySelector(".book-tickets__order-details-text.ticket-type")

ticketType.addEventListener("change", changeTicketType);
youngControlInputs[0].addEventListener("change", setValuesOnOverview);
seniorControlInputs[0].addEventListener("change", setValuesOnOverview);

setValuesOnPageOpen();

function setValuesOnPageOpen() {

    if (exhibitionType) {
        let type = [...ticketType.options].find(item => item.value === exhibitionType);
        type.setAttribute("selected", true);
    } else {
        let type = [...ticketType.options].find(item => item.value === "1");
        type.setAttribute("selected", true);
    }

    if (young) {
        youngControlInputs.forEach(item => item.value = young);
    }

    if (senior) {
        seniorControlInputs.forEach(item => item.value = senior);
    }

    ticketType.dispatchEvent(new Event('change'));
    youngControlInputs[0].dispatchEvent(new Event("change"));
    seniorControlInputs[0].dispatchEvent(new Event("change"));
}

function changeTicketType() {
    overviewTicketType.innerText = ticketType[ticketType.selectedIndex].innerText;
}

function setValuesOnOverview(event) {
    let overviewSet = getSetToChange(event.target.parentNode.classList);
    overviewSet.priceTotal.innerText = event.target.value * overviewSet.priceEach;
    overviewSet.amount.innerText = event.target.value;
}

function getSetToChange(classList) {
    if (classList.contains("young")) {
        return {
            amount: youngTotalOverviewAmount,
            priceTotal: youngTotalOverviewPrice,
            priceEach: 20
        }
    } else if (classList.contains("senior")) {
        return {
            amount: seniorTotalOverviewAmount,
            priceTotal: seniorTotalOverviewPrice,
            priceEach: 10
        }
    } else return null
}





