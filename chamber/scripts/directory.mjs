// directory.mjs

// Load and render members
export async function loadMembers() {
    const container = document.getElementById('members-container');
    if (!container) return; // guard: only run if container exists

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error("Failed to fetch members");
        const members = await response.json();

        container.innerHTML = ""; // clear before appending

        members.forEach(member => {
            const card = document.createElement('section');
            card.classList.add('member-card');

            card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Membership Level:</strong> ${member.membershiplevel}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading member data:', error);
        container.innerHTML = '<p>Unable to load member data at this time</p>';
    }
}

// Setup grid/list toggle
export function setupDirectoryToggle() {
    const container = document.getElementById('members-container');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');

    if (!container || !gridBtn || !listBtn) return; // guard

    gridBtn.addEventListener('click', () => {
        container.classList.add('grid-view');
        container.classList.remove('list-view');
    });

    listBtn.addEventListener('click', () => {
        container.classList.add('list-view');
        container.classList.remove('grid-view');
    });
}
