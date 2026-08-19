import postModel from "../models/Post.model";
import { Request, Response } from "express";


async function createPost(req: Request, res: Response) {
  try {
    const { content, image } = req.body;

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Content is required to create a post",
      });
    }

    const post = await postModel.create({
      content: content.trim(),
      image,
      author: userId,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log("Create Post error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await postModel
      .find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("Get All Posts error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
async function getSinglePost(req:Request,res:Response) {

    try{

    const{postId}=req.params;

    const post=await postModel.findOne({
      _id:postId
    }).populate("author","email fullName");

    if(!post){
      return res.status(404).json({
         message:"Post not found"
      })
    }

    return res.status(200).json({
      message:"Post fetched successfully",
      post
    })

    }
catch(err){
   console.log("Error in single post :",err);
   return res.status(500).json({
      message:"Internal server error"
   })
}
}

export default {
  createPost,
  getAllPosts,
  getSinglePost
};