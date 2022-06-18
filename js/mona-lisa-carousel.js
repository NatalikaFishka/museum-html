const imagesContainer = document.querySelector(".mona-lisa-section__image");
const imagesArray = [...imagesContainer.children];
const arrowsArray = document.querySelectorAll(".image-pagination__arrows img");
const navCubesArray = [...document.querySelectorAll(".image-pagination__navigation-cubes div")];
const paginationNumbers = document.querySelector(".image-pagination__of");

const nextImage = "arrow-next";
const prevImage = "arrow-prev";

const shownImageClass = "shown";
const activeCubeClass = "selected"

imagesContainer.style.transform = "translateX(80%)";

arrowsArray.forEach(arrow => arrow.addEventListener("click", moveImage));
navCubesArray.forEach(cube => cube.addEventListener("click", moveImage));

function moveImage(e, direction = nextImage) {


    let activeImageIndex = imagesArray.findIndex(image => image.classList.contains(shownImageClass));
    let nextImageIndex;

    if (e.type === "click") {
        nextImageIndex = getNextImageIndex(activeImageIndex, e)
    } else {
        nextImageIndex = getNextIndexByDirection(activeImageIndex, direction);
    }

    imagesContainer.style.transform = `translateX(${100 - 100 / imagesArray.length * (nextImageIndex + 1)}%)`;

    if (nextImageIndex === activeImageIndex) return;

    paginationNumbers.innerHTML = `0${nextImageIndex + 1} | 0${imagesArray.length}`

    navCubesArray[activeImageIndex].classList.remove(activeCubeClass);
    navCubesArray[nextImageIndex].classList.add(activeCubeClass);

    imagesArray[activeImageIndex].classList.remove(shownImageClass);
    imagesArray[nextImageIndex].classList.add(shownImageClass);
}

function getNextImageIndex(currentIndex, event) {

    if (!event.target.alt) {

        return navCubesArray.findIndex(cube => cube === event.target)
    }

    return getNextIndexByDirection(currentIndex, event.target.alt)

}

function getNextIndexByDirection(currentIndex, direction) {

    let nextImageIndex;
    if (direction === prevImage) {

        if (currentIndex - 1 >= 0) {
            nextImageIndex = currentIndex - 1;
        } else {
            nextImageIndex = currentIndex;
        }

        return nextImageIndex;

    } else {
        if (currentIndex + 1 < imagesArray.length) {
            nextImageIndex = currentIndex + 1;
        } else {
            nextImageIndex = currentIndex;
        }

    }

    return nextImageIndex;
}

imagesContainer.addEventListener("touchstart", (e) => {

    let translateX = Number(imagesContainer.style.transform.replace(/\D/g, ''));
    imagesContainer.setAttribute("style", `transition: 0s linear; transform: translateX(${translateX}%)`);

    let touchStartPosX = getTouchPosition(e);
    let movedDistanceInPercentX = 0;
    let imagesContainerWidth = imagesContainer.getBoundingClientRect().width;

    imagesContainer.addEventListener("touchmove", touchmoveHandler);

    imagesContainer.addEventListener("touchend", (e) => {

        imagesContainer.setAttribute("style", `transition: 0.8s ease;`);

        if (movedDistanceInPercentX > 2) {
            moveImage(e, prevImage)
        } else if (movedDistanceInPercentX < -2) {
            moveImage(e, nextImage)
        } else {
            imagesContainer.style.transform = `translateX(${translateX}%)`;
        }

        imagesContainer.removeEventListener("touchmove", touchmoveHandler);
        document.body.style.overflowY = "scroll"

    }, { once: true })

    function touchmoveHandler(e) {
        let touchMovePosX = getTouchPosition(e);

        if (Math.abs(movedDistanceInPercentX) > 1) {
            document.body.style.overflowY = "hidden";
        }

        movedDistanceInPercentX = (touchMovePosX - touchStartPosX) * 100 / imagesContainerWidth;
        imagesContainer.style.transform = `translateX(${translateX + movedDistanceInPercentX}%)`;
    }

    function getTouchPosition(event) {
        return event.touches[0].clientX;
    }
})



