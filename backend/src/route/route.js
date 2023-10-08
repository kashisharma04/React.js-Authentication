const express = require('express')
const router = express.Router()
const { login,createUser,getUser } = require('../controller/userController');
const {  updateNote, getNote,createNote} = require('../controller/notesController')
const { authentication , authorization } = require('../middleware/middleware')

router.get('/', (req, res) => {
    res.send('Router Method !');
  });

// user routes
router.post("/registration", createUser)
router.get("/getuser", getUser)
router.post('/login', login)
router.post('/createPost',createNote);
router.put('/updateNote/:id',updateNote);
router.get('/getNote',getNote);
module.exports = router;