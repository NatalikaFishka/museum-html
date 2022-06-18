const brightImage = document.querySelector(".explore-section__light-image");
const slider = document.querySelector(".explore-section__slider img");
const imageArea = document.querySelector(".explore-section__image-area")

slider.addEventListener("drag", (e) => sliderMove(e));
slider.addEventListener("touchmove", (e) => sliderMove(e));


function sliderMove(event) {

    let imageAreaBoundaries = imageArea.getBoundingClientRect();
    let expectedImageWidth;

    if (event.type === "drag") {
        expectedImageWidth = event.clientX - imageAreaBoundaries.left;

    } else if (event.type === "touchmove") {
        expectedImageWidth = event.changedTouches[0].clientX - imageAreaBoundaries.left;

    }

    if (expectedImageWidth <= imageAreaBoundaries.width) {
        brightImage.style.width = expectedImageWidth / imageAreaBoundaries.width * 100 + "%";
    }
}


