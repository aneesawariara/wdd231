//  Visitor Message Logic
export function getVisitMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        message =
            days < 1
                ? "Back so soon! Awesome!"
                : `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
    }

    localStorage.setItem("lastVisit", now);
    return message;
}

export function displayVisitMessage() {
    const visitMessage = document.getElementById("visit-message");
    visitMessage.textContent = getVisitMessage();
}

// Card Rendering Logic
export function createCard(item, index) {
    const card = document.createElement("section");
    card.classList.add("card", `card${index + 1}`);

    card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;

    return card;
}

export function renderCards(data) {
    const container = document.getElementById("discover-cards");
    data.forEach((item, index) => {
        const card = createCard(item, index);
        container.appendChild(card);
    });
}

// Fetch JSON and Initialize
export async function loadDiscoverItems() {
    try {
        const response = await fetch("data/discover.json");
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error("Error loading JSON:", error);
        document.getElementById("discover-cards").innerHTML =
            "<p>Sorry, we couldn't load the discover items.</p>";
    }
}

export function initDiscoverPage() {
    displayVisitMessage();
    loadDiscoverItems();
}
