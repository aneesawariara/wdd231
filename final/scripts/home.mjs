export async function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let currentIndex = 0;

    async function updateCarousel() {
        try {
            const slideWidth = window.innerWidth;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        } catch (error) {
            console.error('Carousel update failed:', error);
        }
    }

    nextBtn.addEventListener('click', async () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            await updateCarousel();
        }
    });

    prevBtn.addEventListener('click', async () => {
        if (currentIndex > 0) {
            currentIndex--;
            await updateCarousel();
        }
    });

    window.addEventListener('resize', async () => {
        await updateCarousel();
    });

    // Initial render
    await updateCarousel();
}


export async function loadWeather() {
    const apiKey = "90a90a827f1d2bc9988300a0a4805b44";
    const lat = -1.29;
    const lon = 36.81;

    try {
        // --- Current Weather ---
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const currentRes = await fetch(currentUrl);
        if (!currentRes.ok) throw new Error("Current weather fetch failed");
        const currentData = await currentRes.json();

        // Inject current conditions
        document.getElementById("current-temp").textContent = `${Math.round(currentData.main.temp)}°C`;
        document.getElementById("weather-desc").textContent = currentData.weather[0].description;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
        document.getElementById("weather-icon").alt = currentData.weather[0].description;
        document.getElementById("high-low").textContent = `H: ${Math.round(currentData.main.temp_max)}°C / L: ${Math.round(currentData.main.temp_min)}°C`;
        document.getElementById("humidity").textContent = `${currentData.main.humidity}%`;

        const sunrise = new Date(currentData.sys.sunrise * 1000);
        const sunset = new Date(currentData.sys.sunset * 1000);
        document.getElementById("sunrise").textContent = sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        document.getElementById("sunset").textContent = sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // --- Forecast ---
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) throw new Error("Forecast fetch failed");
        const forecastData = await forecastRes.json();

        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";

        // First line: Today
        const todayLine = document.createElement("p");
        todayLine.textContent = `Today: ${Math.round(currentData.main.temp)}°C`;
        forecastContainer.appendChild(todayLine);

        // Next 2 days at noon
        const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 2);
        daily.forEach(day => {
            const date = new Date(day.dt_txt);
            const line = document.createElement("p");
            line.textContent = `${date.toLocaleDateString("en-US", { weekday: "long" })}: ${Math.round(day.main.temp)}°C`;
            forecastContainer.appendChild(line);
        });

    } catch (err) {
        console.error("Weather fetch error:", err);
    }
}

export async function getRandomWildlifeFact() {
    try {
        const response = await fetch('./data/wildlife-fact.json'); 
        console.log('Fetch status:', response.status); // Should be 200
        if (!response.ok) throw new Error('Network response was not ok');
        const facts = await response.json();
        console.log('Facts loaded:', facts);

        const randomIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[randomIndex];
        console.log('Selected fact:', randomFact);

        const factContainer = document.querySelector('#fact');
        if (!factContainer) throw new Error('Element with id "fact" not found');
        factContainer.textContent = randomFact.fact;
    } catch (error) {
        console.error('Error fetching wildlife fact:', error);
        document.querySelector('#fact').textContent = 'Could not load fact. Please try again later.';
    }
}




