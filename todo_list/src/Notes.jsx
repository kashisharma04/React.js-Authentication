import React, { useState } from "react";
import './notes.css'
function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
    color: "#ffffff"
  });

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/createPost", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status) {
        const createdNote = await response.json();
        setNotes([...notes, createdNote]);
        setForm({
          title: "",
          body: "",
          color: "#ffffff"
        });
      } else {
        console.error("Error creating note");
        // Handle error state or show error message to the user
      }
    } catch (error) {
      console.error("Error creating note:", error);
      // Handle error state or show error message to the user
    }
  };

  // Function to edit a note
  const editNote = (index) => {
    // Implement your edit logic here
    // For example, open a modal or provide input fields for editing
    // Update the note in the notes state after editing
    // const updatedNotes = [...notes];
    // updatedNotes[index] = updatedNoteData;
    // setNotes(updatedNotes);
  };

  return (
    <div className="notes-app">
      <h2>Notes</h2>
      <div className="notes-container">
        <div className="new-note">
          <h3>Create a New Note</h3>
          <form onSubmit={addNote}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Note"
              name="body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
            <button type="submit">Add Note</button>
          </form>
        </div>
        <div className="all-notes">
          {notes.map((note, index) => (
            <div
              key={index}
              className="note"
              style={{ backgroundColor: note.color }}
            >
              <h3>{note.title}</h3>
              <p>{note.body}</p>
              <button onClick={() => editNote(index)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
