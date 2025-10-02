import { loadMembers, setupDirectoryToggle } from './directory.mjs';
import { loadWeather, loadSpotlight } from './home.mjs';

import { setTimestamp, initModalOpeners, initModalClosers, displaySubmittedData } from './join.mjs';
//hamburger menu
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');

});

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("members-container")) {
        loadMembers();
        setupDirectoryToggle();
    }
    if (document.querySelector(".current-weather")) {
        loadWeather();
    }
    if (document.querySelector(".spotlight-container")) {
        loadSpotlight();
    }
});

//Join page event listener
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("join.html")) {
        setTimestamp();
        initModalOpeners();
        initModalClosers();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("thankyou.html")) {
        displaySubmittedData();
    }
});


//date and last modified
const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;