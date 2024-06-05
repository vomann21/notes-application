const jwt  = require('jsonwebtoken')
require('dotenv').config()
const NotesModel = require('../model/notesModel.js')

const Notes = NotesModel.Notes
exports.auth = (req,res,next)=>{
    const token = req.header('Authorization')
    console.log('kurkure')
    console.log("hello")
    console.log(token)
    if(!token)
    {
       return res.status(402).json({"message":"Invalid Authorization"})
    }
    jwt.verify(token,process.env.SECRETKEY,(err,deToken)=>{
         if(err)
         {
            return res.status(402).json({'message':"Authorization failed"})
         }
         console.log(deToken)
         req.deToken = deToken
    })
    next()
}

exports.getNotes = async(req,res)=>{
     const deTokenEmail = req.deToken.email;
     console.log(deTokenEmail)
     const notes = await Notes.find({user_email:deTokenEmail})
     res.json(notes)
}

exports.createNotes = async(req,res)=>{
    try
    {
        console.log("Hello hellow helwewea")
    const deTokenEmail = req.deToken
    console.log(req.body)
    const {title,content,date} = req.body
    const newNote = new Notes(
        {
            title:title,
            content:content,
            date:date,
            user_email:deTokenEmail.email,
        }
    )
    const createdNote = await newNote.save()
    res.json(createdNote)
    }
    catch(err)
    {
        res.json(err.message)
    }
}

exports.deleteNote= async(req,res)=>{
   try
   {
    const id = req.params.id
    console.log("what is the id")
    console.log(id)
    const deletedNote = await Notes.deleteOne({_id:id})
    res.json(deletedNote)
   }
   catch(err)
   {
       res.json(err)
   }
}

exports.updateNotes = async(req,res)=>{
    try
    {
       const {title,content,date}=req.body
       console.log("updating notes is called")
       console.log(title,content,date)
       await Notes.findOneAndUpdate({_id:req.params.id},{
                                                 title:title,
                                                 content:content,
                                                 date:date
                                              })
        res.json({message:"notes  updated"})
    }
    catch(err)
    {
        res.json(err)
    }
}

exports.getNotesById = async(req,res)=>{
    try{
        const note = await Notes.findOne({_id:req.params.id})
        res.json(note)
    }
    catch(err)
    {
        res.json(err)
    }
}

