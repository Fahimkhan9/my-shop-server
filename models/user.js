
const mongoose=require("mongoose")
const { isEmail } = require("validator");



const userschema =new mongoose.schema({
    name:{
        type:String,
        required:true,
        
    },
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "please enter a valid email"],
      },
      password: {
        type: String,
        required: [true, "please enter an password"],
        minlength: [6, "minimum length is 6"],
      },
})
const User = mongoose.model("user", userschema);

module.exports = User;