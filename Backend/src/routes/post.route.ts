import express from "express"
import createPost from "../controllers/post.controller"
import authMiddleware from "../middleware/authMiddleware"

const routers=express.Router()

routers.post("/create",authMiddleware.authMiddleware,createPost)

export default routers