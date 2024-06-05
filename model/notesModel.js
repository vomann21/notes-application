const mongoose = require('mongoose')
const {Schema} = mongoose

const notesSchema = new Schema({
     title:{
        type:String,
        required:true 
     },
     content:{
        type:String,
        required:true 
     },
     date:{
        type:Date,
        default:Date.now 
     },
     user_email:{
        type:String,
        required:true 
     }
},{
    timestamps:true
})


const Notes = mongoose.model('note',notesSchema)
exports.Notes = Notes