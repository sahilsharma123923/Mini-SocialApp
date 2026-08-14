import mongoose = require("mongoose");


interface IPost extends Document{
    content:string;
    image?:string;
    author:mongoose.Types.ObjectId;
    likes:mongoose.Types.ObjectId[];
    createdAt:Date;
    updatedAt:Date;
}

const postSchema=new mongoose.Schema<IPost>({
    content:{
        type:String,
        required:true,
        trim:true
    },

    image:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
},
{
    timestamps:true
})

const postModel=mongoose.model("User",postSchema);

module.exports=postModel