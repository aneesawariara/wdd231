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





export async function loadSpotlight() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const candidates = members.filter(m =>
            m.membershiplevel === "2" || m.membershiplevel === "3"
        );

        const shuffled = candidates.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const container = document.querySelector(".spotlight-container");
        container.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p class="tagline"><em>${member.tagline || ""}</em></p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            container.appendChild(card);
        });
    }
    catch (error) {
        console.error("Spotlight fetch error:", error);
    }
}

