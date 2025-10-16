
//Capitalize field names for preview IDs
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Extract form data into an object
function getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
}

//Populate elements with sighting data
function populateFields(data, prefix = '') {
    const defaults = {
        visitorName: '—',
        species: '—',
        location: '—',
        date: '—',
        notes: 'No notes provided.'
    };

    for (const key in defaults) {
        const el = document.getElementById(`${prefix}${capitalize(key)}`);
        if (el) {
            el.textContent = data[key] || defaults[key];
        }
    }
}

export function renderSightingDetails() {
    const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    populateFields(params); // No prefix—targets final display
    document.getElementById('visitorName').textContent = params.visitorName;
    document.getElementById('species').textContent = params.species;
    document.getElementById('location').textContent = params.location;
    document.getElementById('date').textContent = params.date;
    document.getElementById('notes').textContent = params.notes;

   

}

export function showLastSighting() {
    const saved = localStorage.getItem('lastSighting');
    if (!saved) return;

    const sighting = JSON.parse(saved);
    const message = document.createElement('p');
    message.className = 'welcome-back';
    message.textContent = `Welcome back, ${sighting.visitorName}! Last time you spotted a ${sighting.species} at ${sighting.location}.`;

    document.querySelector('main').prepend(message);
}

export function setupPreviewDialog() {
    const form = document.querySelector('form');
    const dialog = document.getElementById('confirmationDialog');
    const confirmBtn = document.getElementById('confirmSubmit');
    const cancelBtn = document.getElementById('cancelPreview');
    const previewTrigger = document.getElementById('openDialog');

    if (!form || !dialog || !confirmBtn || !cancelBtn || !previewTrigger) {
        console.error('Missing required elements for dialog setup.');
        return;
    }

    //Show preview dialog with filled-in data
    previewTrigger.addEventListener('click', () => {
        const data = getFormData(form);
        populateFields(data, 'preview'); // Use 'preview' prefix for preview elements
        dialog.showModal();
    });

    //Cancel preview
    cancelBtn.addEventListener('click', () => {
        dialog.close();
    });

    //Confirm and submit form
    confirmBtn.addEventListener('click', () => {
        const data = getFormData(form);
        const params = new URLSearchParams(data);

        localStorage.setItem('lastSighting', JSON.stringify(data));
        window.location.href = `thankyou.html?${params.toString()}`;
    });
}
