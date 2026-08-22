import express from 'express'
import commentController from "../controllers/comment.controller";
import authMiddleware from '../middleware/authMiddleware';

const commentRouter=express.Router()

commentRouter.post("/:postId/comment",authMiddleware.authMiddleware,commentController.commentCreate)

export default commentRouter