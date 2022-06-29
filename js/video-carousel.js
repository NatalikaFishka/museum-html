// const rootStyle = document.documentElement;

const carouselSection = document.querySelector(".video-section__carousel");
const carousel = document.querySelector(".video-section__carousel-videos");
const carouselItemArray = document.querySelectorAll('.video-section__carousel-video-item');
const dotsContainer = document.querySelector(".video-section__pagination-dots");
const doubleArrows = document.querySelectorAll(".double-arrow");

const doubleArrowNext = document.querySelector(".double-arrow img[alt='next-set']");
const doubleArrowPrev = document.querySelector(".double-arrow img[alt='previous-set']");

const prevArrowAlt = "previous-set"
const nextArrowAlt = "next-set"

const visibleCarouselItems = getComputedStyle(document.documentElement).getPropertyValue('--carousel-items-to-show');

setDots();
doubleArrows.forEach(arrow => arrow.addEventListener("click", scrollCarousel))


function setDots() {
    let dotsToShow = (carouselItemArray.length - 1) / visibleCarouselItems;

    for (let i = 0; i < dotsToShow; i++) {

        let dotItem = document.createElement("input");
        dotItem.type = "radio";
        dotItem.value = i;
        dotItem.classList.add("pagination-dots__item");
        dotItem.name = "carousel-dot";

        dotItem.addEventListener("click", scrollCarousel)

        if (i === 0) {
            dotItem.checked = true;
        }

        dotsContainer.appendChild(dotItem);
        dotsContainer.setAttribute("data-checked", 0);
    }

}

function scrollCarousel(event) {


    [...carouselItemArray].forEach((item, index) => console.log(item.offsetLeft));

    const { previousSelection, currentSelection } = getSelectedDot(event);

    let prefix = "-";

    // if (previousSelection < currentSelection) {
    //     prefix = '-'
    // } else if (previousSelection > currentSelection) {
    //     prefix = ''
    // } else {
    //     return
    // }

    console.log("currentSelection", currentSelection)

    let gap = Number(getComputedStyle(carousel).getPropertyValue("column-gap").replace(/\D/g, ''));
    let carouselWidth = Number(getComputedStyle(carouselSection).getPropertyValue("width").replace(/\D/g, ''));
    carousel.style.transform = `translateX(${prefix}${(carouselWidth + gap) * currentSelection}px)`;
    // carouselItemArray.forEach(item => item.style.transform = `translateX(${prefix}${(carouselWidth + gap) * currentSelection}px)`);

    // rootStyle.style.setProperty("--carousel-translate", `${prefix}${(carouselWidth + gap) * currentSelection}px`);

    if (currentSelection === dotsContainer.children.length - 1) {
        carousel.classList.add("last");
    } else {
        carousel.classList.add("last");
    }

    // let shiftPosition = carouselItemArray.item(currentSelection * visibleCarouselItems).offsetLeft;
    // console.log("!!!!!!!!!!!!", shiftPosition)
    // carousel.style.transform = `translateX(${prefix}${shiftPosition}px)`;

    dotsContainer.setAttribute("data-checked", currentSelection);
    dotsContainer.children[currentSelection].checked = true;

    checkIfHideArrow(currentSelection);

    // carousel.addEventListener("animationend", () => {
    //     console.log("ANIMATION DONE")
    //     carousel.setAttribute("style", "justify-content: end");
    // }, { once: true });

}

function getSelectedDot(e) {
    let previousSelection = Number(dotsContainer.getAttribute("data-checked"));
    let currentSelection;

    if (e.target.nodeName === "INPUT") {
        currentSelection = Number(e.target.value);
    } else if (e.target.alt === nextArrowAlt && previousSelection < dotsContainer.children.length - 1) {
        currentSelection = previousSelection + 1;
    } else if (e.target.alt === prevArrowAlt && previousSelection > 0) {
        currentSelection = previousSelection - 1;
    } else {
        currentSelection = previousSelection;
    }

    return { previousSelection, currentSelection }
}

function checkIfHideArrow(currentSelection) {

    let disabledClass = "disabled"

    if (currentSelection === dotsContainer.children.length - 1) {
        doubleArrowNext.classList.add(disabledClass)
    } else {
        doubleArrowNext.classList.remove(disabledClass)
    }

    if (currentSelection === 0) {
        doubleArrowPrev.classList.add(disabledClass)
    } else {
        doubleArrowPrev.classList.remove(disabledClass)
    }
}
