export function setTimestamp() {
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
}

// Modal open logic
export function initModalOpeners() {
    const modalLinks = document.querySelectorAll("[data-modal-target]");
    modalLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const modalId = link.getAttribute("data-modal-target");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });
}
// Modal close logic
export function initModalClosers() {
    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });
}
//thank you 
export function displaySubmittedData() {
    if (!window.location.pathname.includes("thankyou.html")) return;

    const params = new URLSearchParams(window.location.search);
    const list = document.getElementById("details-list");
    if (!list) return;

    // 🧩 Label mapping
    const labelMap = {
        fname: "First Name",
        lname: "Last Name",
        orgtitle: "Organization Title",
        email: "Email",
        phone: "Phone Number",
        orgname: "Organization Name",
        membership: "Membership Level",
        description: "Business Description",
        timestamp: "Submission Time"
    };

    for (const [key, value] of params.entries()) {
        const label = labelMap[key] || key; // fallback to raw key if not mapped
        const item = document.createElement("li");
        item.textContent = `${label}: ${decodeURIComponent(value)}`;
        list.appendChild(item);
    }
}

