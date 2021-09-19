"use strict";

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const btnContainer = document.querySelector(".btn-container");
const buttons = document.querySelectorAll(".btn");
const fullScreenBtn = document.querySelector(".fullscreen");
let currentKey;
let listOfActiveKeys = {};
let src;

piano.addEventListener("mousedown", addActiveCondition);
window.addEventListener("mouseup", removeActiveConditionFromALLKeys);
window.addEventListener("keydown", playByKeyboard);
window.addEventListener("keyup", removeActiveConditionByKeyboard);
btnContainer.addEventListener("click", toggleLetters);
fullScreenBtn.addEventListener("click", toggleFullScreenMode);

function addActiveCondition(event) {
    if (event.target.classList.contains("piano-key")) {

        makeKeyActive(event.target);

        piano.addEventListener("mouseover", addActiveCondition);
        piano.addEventListener("mouseout", removeActiveCondition);
    }
};

function makeKeyActive(targetKey) {
    targetKey.classList.add("piano-key-active", "piano-key-active-pseudo");

    src = `assets/audio/${targetKey.dataset.note}.mp3`;

    playAudio(src);
}

function removeActiveConditionFromALLKeys() {
    piano.removeEventListener("mouseover", addActiveCondition);

    piano.removeEventListener("mouseout", removeActiveCondition);

    pianoKeys.forEach(key => {
        key.classList.remove("piano-key-active", "piano-key-active-pseudo");
    })
};

function removeActiveCondition(event) {
    event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
};

function removeActiveConditionByKeyboard(event) {
    if (currentKey) {
        if (event.code in listOfActiveKeys) {
            listOfActiveKeys[event.code].classList.remove("piano-key-active", "piano-key-active-pseudo");
            delete listOfActiveKeys[event.code];
        };
    };
};

function playByKeyboard(event) {
    if (event.repeat) {
        return;
    };
    if (event.code.includes("Key")) {
        let i,
            size = pianoKeys.length;
        for (i = 0; i < size; i++) {
            if (event.code.slice(-1) === pianoKeys[i].dataset.letter) {
                currentKey = pianoKeys[i];
                listOfActiveKeys[event.code] = currentKey;
                makeKeyActive(currentKey);
                break;
            };
        };
    };
};

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

function toggleLetters(event) {
    if (!event.target.classList.contains("btn-active")) {
        buttons.forEach((btn) => {
            btn.classList.toggle("btn-active");
        });
        pianoKeys.forEach((key) => {
            key.classList.toggle("piano-key-letter");
        })
    };
};

function toggleFullScreenMode() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};