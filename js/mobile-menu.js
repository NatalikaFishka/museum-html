const menuControls = document.querySelectorAll(".mona-lisa-section__mobile-burger-menu img");
const burgerMenuIcon = document.querySelector("img[alt='burger-menu']");
const closeMenuIcon = document.querySelector("img[alt='close-menu']");

const monaLisaText = document.querySelector(".mona-lisa-section__content-text");
const monaLisaTextElements = Array.from(monaLisaText.children);

const mobileMenu = document.querySelector(".mobile-menu");
const navigationLinksArray = document.querySelectorAll(".mobile-menu__navigation-group a");

burgerMenuIcon.addEventListener("click", openMenu);
closeMenuIcon.addEventListener("click", closeMenu);

function openMenu() {
    menuControls.forEach((menuIcon) => menuIcon.classList.toggle("not-active"));

    if (window.innerWidth >= 821) {
        mobileMenu.style.width = "250px";
    } else {
        mobileMenu.style.width = "100%";
    }

    // monaLisaText.style.opacity = "0";


    monaLisaTextElements.forEach(child => child.style.opacity = "0")
    navigationLinksArray.forEach(link => link.addEventListener("click", closeMenu));
}

function closeMenu() {

    menuControls.forEach((menuIcon) => menuIcon.classList.toggle("not-active"));
    mobileMenu.style.width = "0";

    monaLisaTextElements.forEach(child => child.style.opacity = "1")
    navigationLinksArray.forEach(link => link.removeEventListener("click", closeMenu));
}

window.onresize = () => {

    if (burgerMenuIcon.classList.length) {
        closeMenu();
    }
}

