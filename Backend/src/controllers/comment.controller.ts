import Comment from "../models/Comment.model";
import { Request, Response } from "express";
import postModel from "../models/Post.model";
import mongoose from "mongoose";


// create a comment 
async function commentCreate(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const userId = req.user?._id;
    const { content } = req.body;

    // Check logged-in user
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    // Check post ID
    if (!postId || typeof postId !== "string") {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    // Check comment content
    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Comment content is required",
      });
    }

    // Check whether post exists
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Create comment
    const comment = await Comment.create({
      content: content.trim(),
      author: userId,
      post: postId,
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    console.log("Comment error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// get all comment 
async function getAllComment(req:Request,res:Response) {

    try{
        const{postId}=req.params

    if(!postId || Array.isArray(postId) ){
        return res.status(400).json({
            message:"Invalid post ID"
        });
    }

    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(400).json({
            message:"Invalid post ID"
        });
    }

    const comments=await Comment.find(
       { post:postId}
    ).populate("author","fullName email").sort({createdAt:-1})

    return res.status(200).json({
        message:"Post fetched successfully",
        comments
    });
    }catch(err){
        console.log("Get all comment err:",err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}

export default {commentCreate,getAllComment};