// Function to toggle the sidebar
function toggleNav() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

// Function to navigate back to the previous page
function goBack() {
    window.history.back();
}

// Functionality for Save Button
function saveCharacterSelection() {
    alert("Character selections saved!");
}

// Placeholder Functionality for Bottom Buttons
function changeCharacters() {
    alert("Change characters functionality coming soon!");
}

function finishDialogue() {
    alert("Finish dialogue functionality coming soon!");
}

// Add Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.querySelector(".save-button");
    const changeCharactersButton = document.querySelector(".change-characters");
    const finishDialogueButton = document.querySelector(".finish-dialogue");

    saveButton.addEventListener("click", saveCharacterSelection);
    changeCharactersButton.addEventListener("click", changeCharacters);
    finishDialogueButton.addEventListener("click", finishDialogue);
});
