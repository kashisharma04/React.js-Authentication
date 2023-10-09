import React, { useState, useEffect } from "react";
import './notes.css'

function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
    color: "#ffffff"
  });
  const [editMode, setEditMode] = useState(Array(notes.length).fill(false));

  useEffect(() => {
    // Fetch the initial list of notes when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:8080/getNote");
      if (response.status === 200) {
        const data = await response.json();
        setNotes(data.myNote);
      } else {
        console.error("Error fetching notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

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

      if (response.ok) {
        const createdNote = await response.json();
        setNotes([...notes, createdNote]);
        setForm({
          title: "",
          body: "",
          color: "#ffffff"
        });
      } else {
        console.error("Error creating note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const toggleEditMode = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  };

  const updateNote = async (index) => {
    const updatedNotes = [...notes];
    const updatedNoteData = {
      title: form.title,
      body: form.body,
      color: form.color,
    };

    try {
      const response = await fetch(`http://localhost:8080/updateNote/${notes[index]._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedNoteData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const updatedNote = await response.json();
        updatedNotes[index] = updatedNote;
        setNotes(updatedNotes);
        toggleEditMode(index);
        setForm({
          title: "",
          body: "",
          color: "#ffffff"
        });
      } else {
        console.error("Error updating note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    console.log("Deleting note with ID:", id); // Add this line for debugging
  
    try {
      const response = await fetch(`http://localhost:8080/deleteNote/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      } else {
        console.error("Error deleting note:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  
  return (
    <>
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
                key={note._id}
                className="note"
                style={{ backgroundColor: note.color }}
              >
                {editMode[index] ? (
                  <div>
                    <input
                      type="text"
                      placeholder="New Title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="New Note"
                      value={form.body}
                      onChange={(e) =>
                        setForm({ ...form, body: e.target.value })
                      }
                    />
                    <button onClick={() => updateNote(index)}>Update</button>
                  </div>
                ) : (
                  <div>
                    <h3>{note.title}</h3>
                    <p>{note.body}</p>
                  </div>
                )}
                <button onClick={() => toggleEditMode(index)}>
                  {editMode[index] ? "Cancel" : "Edit"}
                </button>
                <button onClick={() => deleteNote(note._id)}>Delete</button> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
