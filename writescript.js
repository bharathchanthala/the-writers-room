document.addEventListener("DOMContentLoaded", function () {
    const storyData = JSON.parse(localStorage.getItem("storyData"));
    if (storyData) {
        const draftText = document.getElementById("draftText");
        draftText.value = `Idea: ${storyData.idea}\n\n`;
        draftText.value += `Length: ${storyData.length}\nGenre: ${storyData.genre}\n`;
        draftText.value += `Setting: ${storyData.setting}\nCharacters: ${storyData.characters.join(", ")}\n\nStart Writing...`;
    }
});

function toggleNav() {
    const nav = document.getElementById("primary-nav");
    nav.style.width = nav.style.width === "250px" ? "0" : "250px";
}

function expandStory() {
    const draftText = document.getElementById("draftText").value;

    if (draftText) {
        const additionalContent = "\n\n[Expansion] Add more vivid descriptions, dialogue, or plot twists!";
        document.getElementById("draftText").value = draftText + additionalContent;
        alert("Your story has been expanded!");
    } else {
        alert("Please write something first.");
    }
}

function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            document.getElementById("draftText").value = content;
        };
        reader.onerror = function () {
            alert("Error reading file. Please try again.");
        };
        reader.readAsText(file);
    } else {
        alert("No file selected.");
    }
}

function goToPreviousPage() {
    // Navigate to the previous page in the browser history
    window.history.back();
}

function goToNextPage() {
    alert("Going to the next section...");
}

function showMenu(element) {
    // Toggle visibility of menu options
    const menu = element.nextElementSibling;
    if (menu) {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    }
}

function paraphraseDialogue(button) {
    alert("Edit functionality coming soon!");
}

function addDialogue(button) {
    const dialogueDiv = button.closest(".dialogue");
    dialogueDiv.remove();
}

function getFeedback(button) {
    alert("Reply functionality coming soon!");
}



function togglePopupMenu(element) {
    const popupMenu = element.nextElementSibling; // Assuming the popup menu is the next sibling
    popupMenu.style.display = popupMenu.style.display === "block" ? "none" : "block";
}

function addNarratives() {
    alert("Add Narratives functionality is triggered!");
}

function addDialogues() {
    alert("Add Dialogues functionality is triggered!");
}

// Optional: Close other open popup menus when clicking outside
document.addEventListener("click", function (event) {
    const isPopup = event.target.closest(".popup-menu");
    const isThreeDots = event.target.classList.contains("three-dots");

    if (!isPopup && !isThreeDots) {
        document.querySelectorAll(".popup-menu").forEach(menu => {
            menu.style.display = "none";
        });
    }
});

let currentMode = ""; // To track 'narratives' or 'dialogues'

function openPopup(mode) {
    currentMode = mode;
    const popupModal = document.getElementById("popupModal");
    const popupTitle = document.getElementById("popupTitle");
    const aiButton = document.getElementById("aiButton");

    // Update modal content dynamically
    popupTitle.textContent = mode === "narratives" ? "Add narratives" : "Add dialogues";
    aiButton.textContent = mode === "narratives" ? "AI Narratives" : "AI Dialogues";

    popupModal.style.display = "flex";
}

function closePopup() {
    const popupModal = document.getElementById("popupModal");
    document.getElementById("popupText").value = "";
    popupModal.style.display = "none";
}

function confirmContent() {
    const text = document.getElementById("popupText").value;
    if (text.trim()) {
        alert(`Content added to ${currentMode}: ${text}`);
        closePopup();
    } else {
        alert("Please enter some content before confirming.");
    }
}

function generateAIContent() {
    // Simulate AI generation
    const aiContent = currentMode === "narratives"
        ? "AI-generated narrative content here..."
        : "AI-generated dialogue content here...";
    document.getElementById("popupText").value = aiContent;
}

document.addEventListener("click", function (event) {
    const modal = document.getElementById("popupModal");
    if (event.target === modal) {
        closePopup();
    }
});

let currentDialogueElement; // To track the current dialogue div being edited

function openDialoguePopup(button, mode) {
    const dialogueDiv = button.closest(".dialogue");
    currentDialogueElement = dialogueDiv.querySelector("p"); // Store current dialogue element

    const character = dialogueDiv.getAttribute("data-character");
    const dialogueText = currentDialogueElement.innerText.split(":")[1]?.trim() || "";

    // Update modal content dynamically
    const popup = document.getElementById("dialoguePopup");
    if (!popup) {
        console.error("Popup modal not found!");
        return;
    }

    popup.querySelector("#popupHeader").textContent =
        mode === "paraphrase" ? "Paraphrase" :
        mode === "dialogue" ? "Re-generate" : "Feedback";
    popup.querySelector("#aiButton").textContent =
        mode === "paraphrase" ? "AI Paraphrase" :
        mode === "dialogue" ? "AI Dialogue" : "AI Feedback";
    const textArea = popup.querySelector("textarea");
    if (textArea) {
        textArea.value = `${character}: ${dialogueText}`;
    } else {
        console.error("Textarea not found in popup modal.");
    }

    // Show AI Feedback section only for 'Feedback' mode
    const aiFeedbackSection = popup.querySelector("#aiFeedbackSection");
    if (aiFeedbackSection) {
        aiFeedbackSection.style.display = mode === "feedback" ? "block" : "none";
    }

    // Show the modal
    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById("dialoguePopup").style.display = "none";
    document.getElementById("dialogueTextArea").value = "";
    document.getElementById("aiFeedbackSection").style.display = "none";
    currentDialogueElement = null;
}

function saveEditedDialogue() {
    const updatedText = document.getElementById("dialogueTextArea").value;
    if (currentDialogueElement && updatedText.trim()) {
        currentDialogueElement.innerHTML = `<strong>${updatedText.split(":")[0]}:</strong> ${updatedText.split(":")[1]}`;
        closePopup();
    } else {
        alert("Please enter valid content before saving.");
    }
}

function generateAIContent() {
    const mode = document.getElementById("aiButton").textContent;
    const aiGeneratedText =
        mode === "AI Paraphrase" ? "AI paraphrased version of the dialogue..." :
            mode === "AI Dialogue" ? "AI-generated new dialogue content..." :
                "AI-generated feedback for the dialogue...";

    document.getElementById("dialogueTextArea").value = aiGeneratedText;
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById("dialoguePopup");
    if (event.target === modal) {
        closePopup();
    }
};

function openPopup(mode) {
    currentMode = mode;
    const popupModalId = mode === "narratives" ? "narrativespopupModal" : "dialoguespopupModal";
    const popupModal = document.getElementById(popupModalId);

    if (!popupModal) {
        console.error(`Popup modal with id '${popupModalId}' not found.`);
        return;
    }

    const popupTitle = popupModal.querySelector("#popupTitle");
    const aiButton = popupModal.querySelector("#aiButton");

    // Update modal content dynamically
    if (popupTitle) {
        popupTitle.textContent = mode === "narratives" ? "Add narratives" : "Add dialogues";
    }
    if (aiButton) {
        aiButton.textContent = mode === "narratives" ? "AI Narratives" : "AI Dialogues";
    }

    popupModal.style.display = "flex";
}

function closenarrativespopupModal() {
    const narrativesPopupModal = document.getElementById("narrativespopupModal");
    if (narrativesPopupModal) {
        narrativesPopupModal.style.display = "none";
        const popupText = narrativesPopupModal.querySelector("#popupText");
        if (popupText) {
            popupText.value = ""; // Clear the text area if needed
        }
    } else {
        console.error("Narratives popup modal not found.");
    }
}

function closedialoguespopupModal() {
    const dialoguesPopupModal = document.getElementById("dialoguespopupModal");
    if (dialoguesPopupModal) {
        dialoguesPopupModal.style.display = "none";
        const popupText = dialoguesPopupModal.querySelector("#popupText");
        if (popupText) {
            popupText.value = ""; // Clear the text area if needed
        }
    } else {
        console.error("Dialogues popup modal not found.");
    }
}

// Function to open the modal
function openMagicPopupModal() {
    const modal = document.getElementById("magicpopupModal");
    if (modal) {
        modal.style.display = "flex"; // Display modal
    } else {
        console.error("Magic popup modal not found!");
    }
}

// Function to close the modal
function closeMagicPopupModal() {
    const modal = document.getElementById("magicpopupModal");
    if (modal) {
        modal.style.display = "none"; // Hide modal
    } else {
        console.error("Magic popup modal not found!");
    }
}

// Optional: Toggle modal visibility
function toggleMagicPopupModal() {
    const modal = document.getElementById("magicpopupModal");
    if (modal) {
        modal.style.display = modal.style.display === "flex" ? "none" : "flex";
    } else {
        console.error("Magic popup modal not found!");
    }
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("magicpopupModal");
    if (event.target === modal) {
        closeMagicPopupModal();
    }
};

function saveAndOpenNewVersion() {
    alert("Saving and opening a new version...");
    // Add your logic for saving and opening a new version here.
}

function regenerateWithoutSaving() {
    alert("Regenerating content without saving...");
    // Add your logic for regenerating without saving here.
}

// Confirm Content
function confirmContent() {
    alert("Content confirmed!");
    closeConfirmModal(); // Optional: Close the modal after confirming
}

function openConfirmModal() {
    const modal = document.getElementById("confirmModal");
    if (modal) {
        modal.style.display = "flex"; // Adjust based on your CSS for showing modals
    } else {
        console.error("Confirm modal not found!");
    }
}

function closeConfirmModal() {
    const modal = document.getElementById("confirmModal");
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("Confirm modal not found!");
    }
}

function closeconfirmModal() {
    const modal = document.getElementById("confirmModal");
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("Confirm modal not found!");
    }
}

function redirectToCoWrite() {
    window.location.href = "co-write.html";
}


