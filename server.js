require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user.js')
const notesRouter = require('./routes/notes.js')


const server = express()

server.use(cors())
server.use(express.json())

server.use('/user',userRouter.userRouter)
server.use('/api/notes',notesRouter.notesRouter)


const main = async() =>
{
    await mongoose.connect(process.env.DBURL)
    console.log("database connected") 
}
main()
  

const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log(`server is listening to port..............`)
})