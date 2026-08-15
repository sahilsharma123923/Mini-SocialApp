import userModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction} from "express";

async function authMiddleware(req:Request,res:Response,next:NextFunction) {
 const token =req.cookies.token || req.headers.authorization?.split("") [1];
 
 if(!token){
    return res.status(401).json({
        message:"Unauthorized access , token is missing"
    })
 }
 try {
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables")
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET) as {userId:string};

    const user=await userModel.findById(decoded.userId)

    req.user=user

    return next()
    
 } catch (error) {
    return res.status(401).json({
        message:"Unauthorized access,token is missing"
    })
 }
}

export default {authMiddleware}