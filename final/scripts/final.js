import { loadWeather, initCarousel, getRandomWildlifeFact } from "./home.mjs";
import { renderSightingDetails, showLastSighting, setupPreviewDialog } from "./tracker.mjs";


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

// Tracker Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('confirmationDialog')) {
        setupPreviewDialog();
    }
    
    renderSightingDetails();     
    showLastSighting(); 
    
    
});




//date and last modified
const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = new Date().getFullYear();