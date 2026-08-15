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
            const hashPassword=await bcrypt.hash(password,10)

            const user=await userModel.create({
                email,
                fullName,
                password:hashPassword
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

export default {userRegister}
