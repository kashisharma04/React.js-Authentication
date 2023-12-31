const express = require('express');
const app = express();
const cors= require('cors')
const route = require('./src/route/route')
app.use(express.json());
const mongoose = require('mongoose')
app.use(cors())
require('dotenv').config();
const {PORT , MONGODB_CONNECT} = process.env;
mongoose.set('strictQuery' , true);
mongoose.connect(
    MONGODB_CONNECT ,
    { useNewUrlParser : true }
)
.then(()=>{
    console.log("Server Connected with MongoDb")
})
.catch((error)=>{
    console.log("Error in connection", error.message)
})
app.use('/',route);
app.listen(PORT , ()=>{
    console.log(`Server running at ${PORT}`)
})

