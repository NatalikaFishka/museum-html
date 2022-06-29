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

    const currentSelection = getSelectedDot(event);

    let prefix = "-";
    let filteredItems = [...carouselItemArray].filter(item => !item.classList.contains("on-big-screen"))
    let scrollOffset = filteredItems[visibleCarouselItems * currentSelection].offsetLeft;
    carousel.style.transform = `translateX(${prefix}${scrollOffset}px)`;

    dotsContainer.setAttribute("data-checked", currentSelection);
    dotsContainer.children[currentSelection].checked = true;

    checkIfHideArrow(currentSelection);
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

    return currentSelection
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
