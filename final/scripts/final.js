import { loadWeather, initCarousel, getRandomWildlifeFact } from "./home.mjs";


//hamburger menu
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');

});

//Carousel 
document.addEventListener('DOMContentLoaded', async () => {
    await initCarousel();
});

// Weather forecast
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".current-weather")) {
        loadWeather();
    }
});

//Random Fact
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#fact")) {
        getRandomWildlifeFact();
    }
});


//date and last modified
const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = new Date().getFullYear();