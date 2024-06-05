const express =require('express')
const userController = require('../controller/user.js')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

userRouter.post('/register',userController.userRegister)
userRouter.post('/login',userController.userLogin)
userRouter.get('/verify',userController.verifyToken)

exports.userRouter = userRouter