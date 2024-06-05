const express = require('express')
const notesController = require('../controller/notes.js')
const notesRouter = express.Router()

notesRouter.get('/getnotes',notesController.auth,notesController.getNotes)
notesRouter.post('/createnotes',notesController.auth,notesController.createNotes)
notesRouter.delete('/deletenote/:id',notesController.auth,notesController.deleteNote)
notesRouter.put('/updatenote/:id',notesController.auth,notesController.updateNotes)
notesRouter.get('/getnoteById/:id',notesController.auth,notesController.getNotesById)

exports.notesRouter = notesRouter