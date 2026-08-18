import postModel from "../models/Post.model"
import { Request,Response } from "express"

interface authRequest extends Request{
    image?:string
}
async function createPost(req:authRequest,res:Response){
   try{
     const {content,image}=req.body

     const userId=req.user?._id

     if(!userId){
        return res.status(401).json({
            message:"Unauthorized access"
        })
     }

     if(!content){
        return res.status(400).json({
            message:"Content is required to create a post"
        })
     }

     const post =await postModel.create({
        content,
        image,
        author:userId
     })

     return res.status(201).json({
        message:"Post created successfully",
        post
     })

   }catch(err){
    console.log("CreatePost err :",err)
    return res.status(500).json({
        message:"Internal server error"
    })
   }
}

export default createPost