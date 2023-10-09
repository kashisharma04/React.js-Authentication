const noteModel = require('../models/notes'); 
// Import your note schema/model
const createNote = async function (req, res) {
  try {
    const { title, body, color } = req.body;
    // Checking for required fields
    if (!title) {
      return res.status(400).send({ status: false, message: 'Title is required' });
    }
    if (!body) {
      return res.status(400).send({ status: false, message: 'Body is required' });
    }
    const newNote = await noteModel.create({
      title,
      body,
      color,
    });
    return res.status(201).send({ status: true, data: newNote });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
const getNote = async function(req,res){
  try {
    const myNote = await noteModel.find()
    res.status(200).json({ status: true, myNote: myNote })
} catch (error) {
    console.log(error)
    res.status(500).json({ status: false, error: error })
}
}
const updateNote = async function (req,res){
  try {
    const { id } = req.params; // Assuming you use a route parameter to identify the note to update
    const { title, body, color } = req.body;

    // Checking if the note with the given ID exists
    const existingNote = await noteModel.findById(id);

    if (!existingNote) {
      return res.status(404).send({ status: false, message: 'Note not found' });
    }

    // Update the note with the new data
    existingNote.title = title;
    existingNote.body = body;
    existingNote.color = color;

    // Save the updated note
    const updatedNote = await existingNote.save();

    return res.status(200).send({ status: true, data: updatedNote });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteNote = async function (req, res) {
  try {
    const { id } = req.params;
    console.log("Deleting note with ID:", id); // Add this line for debugging

    const existingNote = await noteModel.findById(id);

    if (!existingNote) {
      return res.status(404).send({ status: false, message: 'Note not found' });
    }

    await existingNote.remove();

    return res.status(200).send({ status: true, message: 'Note deleted successfully' });
  } catch (err) {
    console.error("Error deleting note:", err); // Add this line for debugging
    return res.status(500).send({ status: false, message: err.message });
  }
};


module.exports = {
  createNote, updateNote, getNote, deleteNote
};
