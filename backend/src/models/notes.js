const mongoose= require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type : String,
        require : true
    }, 
    body : {
        type : String,
        require : true
    },
    color: {
        type : String,
        required : true
    },
},{timestamps:true
})

module.exports = mongoose.model('Notes' , noteSchema);

