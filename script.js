// =========================
// Notes Board App
// =========================

const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// =========================
// Render Notes
// =========================

function renderNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {

        const noteEl = document.createElement("div");
        noteEl.classList.add("note");

        noteEl.innerHTML = `
            <div class="actions">
                <button onclick="editNote(${index})"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>

            <textarea onchange="updateNote(${index}, this.value)">${note}</textarea>
        `;

        notesContainer.appendChild(noteEl);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

// =========================
// Add Note
// =========================

addNoteBtn.addEventListener("click", () => {

    const text = noteInput.value.trim();

    if (!text) return;

    notes.push(text);
    noteInput.value = "";

    renderNotes();
});

// =========================
// Delete Note
// =========================

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

// =========================
// Edit Note
// =========================

function editNote(index) {
    const newText = prompt("Edit your note:", notes[index]);

    if (newText !== null) {
        notes[index] = newText;
        renderNotes();
    }
}

// =========================
// Update Note (textarea change)
// =========================

function updateNote(index, value) {
    notes[index] = value;
    renderNotes();
}

// Initial Load
renderNotes();