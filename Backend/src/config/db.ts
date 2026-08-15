import dotenv from 'dotenv'
dotenv.config();

import mongoose from "mongoose";

async function connectDB() {
    
     if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Error :",error)
    }
}

export default connectDB