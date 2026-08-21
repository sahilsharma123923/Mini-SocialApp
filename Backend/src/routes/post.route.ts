import express from "express"
import postController from "../controllers/post.controller"
import authMiddleware from "../middleware/authMiddleware"

const routers=express.Router()

routers.post("/create",authMiddleware.authMiddleware,postController.createPost)
routers.get("/",authMiddleware.authMiddleware,postController.getAllPosts)
routers.get("/:postId",authMiddleware.authMiddleware,postController.getSinglePost)
routers.patch("/:postId",authMiddleware.authMiddleware,postController.editPost)
routers.delete("/:postId",authMiddleware.authMiddleware,postController.deletePost)
routers.post("/:postId/like",authMiddleware.authMiddleware,postController.likePost)


export default routers;