import postModel from "../models/Post.model"
import { Request,Response } from "express"

interface authRequest extends Request{
    userId?:string
}
async function createPost(req:authRequest,res:Response):Promise<void> {
   try{

   }catch(err){
    console.log("CreatePost err :",err)
    
   }

    
}