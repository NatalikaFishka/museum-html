const dateField = document.querySelector("input[type='date']");
const timeField = document.querySelector("input[type='time']");

const dateOnOverview = document.querySelector(".book-tickets__order-details-text.date")
const timeOnOverview = document.querySelector(".book-tickets__order-details-text.time")

dateField.addEventListener("change", setOverviewDate);
timeField.addEventListener("change", setOverviewTime);
getTodaysDate();


function getTodaysDate() {
    let nowTime = Date.now();
    let dateObj = new Date(nowTime);

    let time = dateObj.getHours() + 1;

    if (time > 19) {
        nowTime = nowTime + 7 * 3600 * 1000;
        dateObj = new Date(nowTime);
    }

    if (time > 19 || time < 10) {
        time = 10;
    }

    let date = ("0" + dateObj.getDate()).slice(-2);
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let year = dateObj.getFullYear();


    timeField.value = `${time}:00`
    dateField.value = `${year}-${month}-${date}`;
    dateField.setAttribute("min", `${year}-${month}-${date}`);

    dateField.dispatchEvent(new Event("change"));
    timeField.dispatchEvent(new Event("change"));

}

function setOverviewDate() {
    let selectedDate = new Date(dateField.value);
    let date = selectedDate.getDate();
    let weekDate = selectedDate.toLocaleString('default', { weekday: 'long' });
    let month = selectedDate.toLocaleString('default', { month: 'long' });

    dateOnOverview.innerText = `${weekDate}, ${month} ${date}`;
}

function setOverviewTime() {
    let selectedTime = timeField.valueAsDate.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' });
    timeOnOverview.innerText = selectedTime;
}