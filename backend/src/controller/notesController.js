const noteModel = require('../models/notes'); // Import your note schema/model

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

    if (!color || !['red', 'orange', 'yellow', 'green', 'blue'].includes(color)) {
      return res.status(400).send({ status: false, message: 'Valid color is required' });
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

module.exports = {
  createNote
};
