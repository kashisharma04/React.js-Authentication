const express = require('express')
const router = express.Router()
const { login,createUser,getUser } = require('../controller/userController');
const {  } = require('../controller/notesController')
const { authentication , authorization } = require('../middleware/middleware')

router.get('/', (req, res) => {
    res.send('Router Method !');
  });

// user routes
router.post("/registration", createUser)
router.get("/getuser", getUser)
router.post('/login', login)



module.exports = router;