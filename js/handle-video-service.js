const root = document.documentElement;

const video = document.querySelector('video');
const playIconMini = document.querySelector(".video-section_play-control img[alt='play']");
const pauseIconMini = document.querySelector(".video-section_play-control img[alt='pause']");
const hugePlayBtn = document.querySelector(".video-section_main-play-button img[alt='play']");

const volumeOnControl = document.querySelector(".video-section__volume-bar img[alt='volume']")
const muteControl = document.querySelector(".video-section__volume-bar img[alt='mute']");
const volumeBar = document.querySelector("#volume-bar");

const progressBar = document.querySelector("#progress-bar");

const fullScreen = document.querySelector("img[alt='full-size-screen']");

setInitVolume();

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
    let passedTime = video.currentTime * 100 / video.duration;
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