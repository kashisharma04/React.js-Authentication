import React, { useState } from 'react';
function Notes() {
  // Initialize state for managing notes
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', body: '', color: '' });

  // Function to add a new note
  const addNote = () => {
    if (newNote.title && newNote.body && newNote.color) {
      setNotes([...notes, newNote]);
      setNewNote({ title: '', body: '', color: '' });
    }
  };

  // Function to edit a note
  const editNote = (index) => {
    // Implement your edit logic here, you can open a modal or provide input fields for editing
    // For simplicity, we'll just remove the note for this example
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-app">
      <h2>Notes</h2>
      <div className="notes-container">
        <div className="new-note">
          <h3>Create a New Note</h3>
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Note"
            value={newNote.body}
            onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          />
          <input
            type="color"
            value={newNote.color}
            onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
          />
          <button onClick={addNote}>Add Note</button>
        </div>
        <div className="all-notes">
          {notes.map((note, index) => (
            <div key={index} className="note" style={{ backgroundColor: note.color }}>
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
