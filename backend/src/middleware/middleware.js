const userModel = require('../models/user')
const notesModel = require('../models/notes')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {JWT_SECRET } = process.env

//=====================Authentication==================

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['X-Header-Key'] || req.headers['x-header-key']

        if (!token) return res.status(401).json({
            Message: "Token Not Found"
        })

        jwt.verify(token, JWT_SECRET, async(error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid Token Authentication failed"
                });
            }

            const user = await userModel.findById(decoded.user_id);

            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorized access'
                });
            }
            req.iD = user._id;
            // // console.log(req.iD)
             next();
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        })
    }
}

//=====================/Authorizaton/====================

const authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-header-key"]
        const decoded = jwt.verify(token, JWT_SECRET)

       let decodedUser = decoded.user_id
  
         let noteId = req.params.noteId
        
        let getnote = await notesModel.findById(noteId)

        if (getnote == null) return res.status(404).send({
            status: false,
            message: "notes not found"
        });

        let user = getnote.userId.toString()
        if (decodedUser !== user) return res.status(400).send({
            status: false,
            message: "You are not authorised to perform this action"
        })

        next();

    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

module.exports.authentication=authentication;
module.exports.authorization=authorization;