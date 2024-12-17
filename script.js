function toggleNav() {
    const nav = document.getElementById("primary-nav");
    nav.style.width = nav.style.width === "250px" ? "0" : "250px";
}

function addCharacter() {
    const input = document.getElementById("character-details");
    const charList = document.getElementById("character-list");

    if (input.value.trim() !== "") {
        const charElement = document.createElement("span");
        charElement.textContent = input.value.trim();
        charElement.className = "character-name";
        charElement.onclick = () => charList.removeChild(charElement);
        charList.appendChild(charElement);
        input.value = "";
    } else {
        alert("Please enter a character name.");
    }
}


function continueToNext() {
    alert('Proceeding to the next step!');
    // Add logic for form submission or redirection
}


// Prevent form default behavior and redirect on submit
document.getElementById('story-details-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    window.location.href = 'write.html'; 
});
