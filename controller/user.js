const UserModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = UserModel.User
exports.userRegister=async(req,res)=>{
   try
   {
    const {username,email,password} = req.body
    console.log(username, email, password)
    const isOlduser = await User.findOne({email:email}) 
    if(isOlduser)
    {
        return res.json({message:"email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
     const user = new User(
        {
            username:username,
            email:email,
            password:hashedPassword
        }
     )
     console.log("Hello")
     const newUser = await user.save()
     console.log("new user created")
     return res.status(201).json({message:"registration successful"})
   }
   catch(err)
   {
      res.send(err)
   }
}



exports.userLogin=async(req,res)=>{
   try
   {
    const {email,password}=req.body;
    const isValidUser = await User.findOne({email:email})
    if(!isValidUser)
        return res.json({message:"user doesn't exist with this email"})

    const isValidPassword = await bcrypt.compare(password,isValidUser.password)

    if(!isValidPassword)
    {
        console.log("hello")
        return res.json({message:"password is incorrect.."})
    }

        const token = jwt.sign({email:email},process.env.SECRETKEY,{expiresIn:"1d"})
        res.status(200).json({token:token})
   }
   catch(err)
   {
    res.send(err)
    console.log(err)
   }
}

exports.verifyToken=(req,res)=>{
    try{
        const token = req.header('Authorization')
        console.log(token)
        if(!token)
            return res.send(false)
        jwt.verify(token,process.env.SECRETKEY,(err,deToken)=>{
             if(err)
                {
                    return res.send(false)
                }
              let user = User.findOne({email:deToken.email})
             if(!user)
             {
                    return res.send(false)
             }
             res.send(true)
        })
    }
    catch(err)
    {
        res.send(err)
    }
}


