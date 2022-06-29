const root = document.documentElement;
const carouselItemToShow = getComputedStyle(root).getPropertyValue('--carousel-items-to-show');

const video = document.querySelector('video.video-section__video');
const playIconMini = document.querySelector(".video-section_play-control img[alt='play']");
const pauseIconMini = document.querySelector(".video-section_play-control img[alt='pause']");
const hugePlayBtn = document.querySelector(".video-section_main-play-button img[alt='play']");

const volumeOnControl = document.querySelector(".video-section__volume-bar img[alt='volume']")
const muteControl = document.querySelector(".video-section__volume-bar img[alt='mute']");
const volumeBar = document.querySelector("#volume-bar");

const progressBar = document.querySelector("#progress-bar");

const fullScreen = document.querySelector("img[alt='full-size-screen']");

const carouselItems = document.querySelectorAll(".video-section__carousel-video-item");
const miniVideos = document.querySelectorAll(".video-item__video");
const miniVideoPlayIcons = document.querySelectorAll(".video-item__play");

setInitVolume();
[...carouselItems].forEach((item, index) => item.style.order = index);

hugePlayBtn.addEventListener("click", play);
playIconMini.addEventListener("click", play);
pauseIconMini.addEventListener("click", pause);

volumeBar.addEventListener("input", changeVolume);
volumeOnControl.addEventListener("click", turnVolumeOff);
muteControl.addEventListener("click", turnVolumeOn);

fullScreen.addEventListener("click", fullSizeScreen);

video.addEventListener("timeupdate", updateProgressBarOnPlay);
progressBar.addEventListener("input", updateVideoOnProgressBarChange);

video.addEventListener("ended", videoStopped);
video.addEventListener("click", handleVideo);

miniVideoPlayIcons.forEach(icon => icon.addEventListener("mouseenter", playMiniVideoOnHove));
miniVideos.forEach(miniVideo => miniVideo.addEventListener("mouseleave", stopMiniVideo));
miniVideos.forEach(miniVideo => miniVideo.addEventListener("click", playOnBigScreen));


function handleVideo() {
    if (video.paused) {
        play()
    } else {
        pause()
    }
}

function play() {
    video.play();
    pauseIconMini.style.display = "initial";
    playIconMini.style.display = "none";
    hugePlayBtn.style.display = "none";
};

function pause() {
    video.pause();
    pauseIconMini.style.display = "none";
    playIconMini.style.display = "initial";
    hugePlayBtn.style.display = "initial";

}

function turnVolumeOff() {
    video.muted = true;
    volumeOnControl.style.display = "none";
    muteControl.style.display = "initial";
    volumeBar.value = 0;
    setVolumeBarShadow(0)

}

function turnVolumeOn() {
    video.muted = false;
    volumeOnControl.style.display = "initial";
    muteControl.style.display = "none";
    volumeBar.value = volumeBar.getAttribute("value")
    setVolumeBarShadow(volumeBar.value);
}

function fullSizeScreen() {
    video.requestFullscreen();
}

function setInitVolume() {
    video.volume = volumeBar.value;
}

function changeVolume(e) {
    let volume = e.target.valueAsNumber;
    volumeBar.setAttribute("value", e.target.value);
    video.volume = volume;
    setVolumeBarShadow(volume);
    if (volume) {
        volumeOnControl.style.display = "initial";
        muteControl.style.display = "none";
    } else {
        volumeOnControl.style.display = "none";
        muteControl.style.display = "initial";
    }
}

function updateProgressBarOnPlay() {
    let passedTime;
    if (video.duration) {
        passedTime = video.currentTime * 100 / video.duration;
    } else {
        passedTime = 0;
    }

    progressBar.value = passedTime;
    setProgressBarShadow(passedTime);
}

function updateVideoOnProgressBarChange(e) {
    let passedTime = e.target.valueAsNumber;
    setProgressBarShadow(passedTime);
    video.currentTime = passedTime * video.duration / 100;
}

function videoStopped() {
    pauseIconMini.style.display = "none";
    playIconMini.style.display = "initial";
    hugePlayBtn.style.display = "initial";
}

function setVolumeBarShadow(volume) {
    root.style.setProperty("--passed-volume-track", `${volume * 100}%`)
}

function setProgressBarShadow(passedTime) {
    root.style.setProperty("--passed-progress-track", `${passedTime}%`);
}

function playMiniVideoOnHove(event) {
    let miniVideoPlayIcon = event.target;
    let miniVideo = miniVideoPlayIcon.parentElement.querySelector('video');
    console.log(event.target.parentElement.querySelector('video'));
    miniVideo.play();
    miniVideoPlayIcon.style.visibility = "hidden";
}

function stopMiniVideo(event) {
    let miniVideoContainer = event.target;
    let miniVideoPlayIcon = miniVideoContainer.parentElement.querySelector('.video-item__play')
    miniVideoContainer.lastChild.load();
    miniVideoPlayIcon.style.visibility = "initial";
}

function playOnBigScreen(event) {
    let currentBigVideo = [...carouselItems].find(item => item.classList.contains("on-big-screen"));
    let miniVideo = event.target;
    let miniVideoContainer = miniVideo.parentElement.parentElement;

    miniVideoContainer.classList.add("remove");
    let removedItemOrder = Number(miniVideoContainer.style.order);

    if (removedItemOrder < carouselItems.length - carouselItemToShow) {
        currentBigVideo.style.order = carouselItems.length;
    }

    currentBigVideo.classList.add("add-to-carousel");

    miniVideoContainer.addEventListener("animationend", () => {
        currentBigVideo.classList.remove("on-big-screen");
        currentBigVideo.classList.remove("add-to-carousel");

        if (currentBigVideo.style.order > 0) {
            console.log("Straight direction", typeof currentBigVideo.style.order);
            [...carouselItems].forEach(item => {
                if (Number(item.style.order) > removedItemOrder) {
                    item.style.order = Number(item.style.order) - 1;
                }
            })
        } else {
            console.log("Reverse direction");
            [...carouselItems].forEach(item => {
                if (Number(item.style.order) < removedItemOrder) {
                    item.style.order = Number(item.style.order) + 1;
                }
            })
        }

        miniVideoContainer.classList.remove("remove");
        miniVideoContainer.classList.add("on-big-screen");
        miniVideoContainer.style.order = 0;
        video.src = miniVideo.src;
        video.poster = miniVideo.poster;
    }, { once: true })

    // play();
}