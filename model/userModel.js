const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username:{type:String, required:[true,"Username is requried"]},
    email:{type:String, required:[true,"Email is required"], 
         validate:{
            validator:function(v)
            {
                return /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(v)
            },
            message: props => `${props.value} is not a valid email!`
         },
    },
    password:{type:String, minlength:[4,"minlength should be 4"],required:true}
})

const User = mongoose.model('user',userSchema)

exports.User = User