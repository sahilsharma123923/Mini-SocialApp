import express from "express"
import postController from "../controllers/post.controller"
import authMiddleware from "../middleware/authMiddleware"

const routers=express.Router()

routers.post("/create",authMiddleware.authMiddleware,postController.createPost)
routers.get("/",authMiddleware.authMiddleware,postController.getAllPosts)
routers.get("/:id",authMiddleware.authMiddleware,postController.getSinglePost)


export default routers