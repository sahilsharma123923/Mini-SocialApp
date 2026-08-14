import mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    FullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required to create a account"],
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLenght:[6,"password contain more than 6 characters"]
    }
},{
    timestamps:true
})

const userModel=mongoose.model("User",userSchema)

module.exports=userModel