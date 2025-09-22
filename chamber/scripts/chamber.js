//hamburger menu
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');

});

// Fetch and display member data Directory Page
const container = document.getElementById('members-container');

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        members.forEach(member => {
            const card = document.createElement('section');
            card.classList.add('member-card');
            
            const imageSrc = member.image;
            card.innerHTML = `
            <img src="${imageSrc}"  alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Address: </strong>${member.address}</p>
            <p><strong>Phone: </strong>${member.phone}</p>
            <p><strong>Membership Level: </strong>${member.membershiplevel}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            
            container.appendChild(card);
        });
    }
    catch (error){
        console.error('Error loadingmember data:', error);
        container.innerHTML = '<p>Unable to load member data at this time</p>';
    }
}

loadMembers();

//Toggle between list and grid views
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
});


// home page js


//date and last modified
const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;