import userModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import { Request,Response } from "express";
import bcrypt from "bcryptjs";

async function userRegister(req:Request,res:Response) {

    try {
            const{email,fullName,password}=req.body
        
            const isEmailExit=await userModel.findOne({
                email:email
            })
        
            if(isEmailExit){
                return res.status(422).json({
                    message:"User already exists",
                    status:"Failed"
                })
            }

            const user=await userModel.create({
                email,
                fullName,
                password
            })

            if(!process.env.JWT_SECRET){
                throw new Error("JWT_SECRET is not defined in environment variables")
            }
            const token=await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

            res.cookie("token",token,{
                httpOnly:true,
                maxAge:3*24*60*60*1000,
            })

            return res.status(201).json({
                message:"User registerd successfully",
                status:"Success",
                user:{
                    id:user._id,
                    email:user.email,
                    fullName:user.fullName
                }
            });
    } catch (error) {
        console.log("Register err :",error)
        return res.status(500).json({
            messsage:"Something went wrong",
            status:"Failed"
        })
    }
}

async function userLogin(req:Request,res:Response){

   try{
       const {email,password}=req.body
   
       const user=await userModel.findOne({
           email
       })
   
       if(!user){
        return res.status(401).json({
               message:"Email or password is not valid",
               status:"Failed"
           })
       }
       const isValidPassword=await user?.comparePassword(password)
   
       if(!isValidPassword){
           return res.status(401).json({
               message:"Email or password is not valid",
               status:"Failed"
           })
       }
       if(!process.env.JWT_SECRET){
         throw new Error("JWT_SCRET is not defined in environment variables")
       }
   
       const token=jwt.sign({userId:user?._id},process.env.JWT_SECRET,{expiresIn:"3d"})
   
        res.cookie("token",token,{
                httpOnly:true,
                maxAge:3*24*60*60*1000,
            })

       return res.status(200).json({
        message:"User login successfully",
        User:{
            id:user._id,
            email:user.email,
        }
       })
   }catch(err){
     console.log("Login error :",err)

     return res.status(501).json({
      message:"Something went wrong"
     })
   }

}
async function googleAuth(req:Request,res:Response) {
    try {
        const {access_token}=req.body;

        if(!access_token){
            return res.status(400).json({
                message:"Access token is required",
                status:"Failed"
            })
        }

        const googleRes = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );

        if(!googleRes.ok){
            return res.status(401).json({
                message:"Invalid Google token",
                status:"Failed"
            })
        }

        const googleData=await googleRes.json();
        const{email,fullName}=googleData;

        if(!email){
            return res.status(400).json({
                message:"Could not retrieve email from Google",
                status:"Failed"
            })
        }

        let user=await userModel.findOne({
            email
        });

        if(!user){
            user=await userModel.create({
                email,
                fullName,
                authProvider:"google"
            })
        }
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not defined in environment variables")
        }
         const token=jwt.sign({userId:user?._id},process.env.JWT_SECRET,{expiresIn:"3d"})
   
        res.cookie("token",token,{
                httpOnly:true,
                maxAge:3*24*60*60*1000,
            })

            res.status(200).json({
                message:"Google Login successfully",
                status:"Success",
                user:{
                    id:user._id,
                    email:user.email,
                    fullName:user.fullName
                }
            })
    } catch (error) {
        console.log("Google auth Failed :",error)
        return res.status(500).json({
            message:"Something went wrong",
            status:"Failed"
        })
    }
}
export default {userRegister,userLogin,googleAuth}
