document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.querySelector(".save-button");
    const chatBox = document.querySelector(".chat-box");
    const characterSelection = document.querySelector(".character-selection");
    const dialogueInput = document.querySelector(".dialogue-input");
    const bottomButtons = document.querySelector(".bottom-buttons");
    const changeCharactersButton = document.querySelector(".change-characters");
    const chatMessagesContainer = document.getElementById("chatMessages");

    chatBox.classList.add("hidden");

    // Show the chat interface after saving characters
    saveButton.addEventListener("click", () => {
        characterSelection.classList.add("hidden");
        chatBox.classList.remove("hidden");
        dialogueInput.classList.add("hidden");
        bottomButtons.classList.add("hidden");
    });

    // Modal Logic
    const characterList = ["Character 1", "Character 2", "Character 3"];
    const userCharacterInput = document.getElementById("character-name");
    const aiCharacterInput = document.getElementById("ai-character-name");

    function showCharacterOptions(targetInput) {
        const options = characterList.map(
            (character) => `<li onclick="selectCharacter('${character}', '${targetInput}')">${character}</li>`
        ).join("");

        const optionsModal = `
        <div id="character-modal" class="character-modal">
            <div class="character-modal-content">
                <h3>Select a Character</h3>
                <ul>${options}</ul>
                <button onclick="closeCharacterModal()">Close</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML("beforeend", optionsModal);
    }

    window.selectCharacter = (character, targetInput) => {
        if (targetInput === "user") {
            userCharacterInput.value = character;
        } else if (targetInput === "ai") {
            aiCharacterInput.value = character;
        }
        closeCharacterModal();
    };

    window.closeCharacterModal = () => {
        const modal = document.getElementById("character-modal");
        if (modal) {
            modal.remove();
        }
    };

    document.querySelectorAll(".add-character").forEach((button, index) => {
        button.addEventListener("click", () => {
            const targetInput = index === 0 ? "user" : "ai";
            showCharacterOptions(targetInput);
        });
    });

    // Chat functionality
    let chatMessages = [];

    function updateChatUI() {
        chatMessagesContainer.innerHTML = chatMessages.map((msg) => {
            const senderClass = msg.sender === "user" ? "user" : "ai";
            return `<div class="chat-message ${senderClass}">${msg.text}</div>`;
        }).join("");
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    window.sendUserDialogue = function () {
        const userDialogue = document.getElementById("userDialogue").value.trim();
        if (!userDialogue) return;

        chatMessages.push({ sender: "user", text: userDialogue });
        document.getElementById("userDialogue").value = "";
        updateChatUI();
    };

    window.generateAiDialogue = function () {
        const aiDialogue = `AI's response to "${chatMessages[chatMessages.length - 1]?.text || "the first dialogue"}"`;
        chatMessages.push({ sender: "ai", text: aiDialogue });
        updateChatUI();
    };

    window.finishDialogue = function () {
        alert("Dialogue finished! Returning to write.html...");
        window.location.href = "write.html";
    };
});
