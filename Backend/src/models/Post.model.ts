import mongoose from "mongoose";


 export interface IPost extends Document{
    content:string;
    image?:string;
    author:mongoose.Types.ObjectId;
    likes:mongoose.Types.ObjectId[];
    comments:number;
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
    comments:{
      type:Number,
      default:0
    }
},
{
    timestamps:true
})

const postModel=mongoose.model("Post",postSchema);

export default postModel