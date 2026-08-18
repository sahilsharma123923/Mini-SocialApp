import express from 'express'
import authController from '../controllers/auth.controller'
import authMiddleware from '../middleware/authMiddleware';

const router=express.Router();

router.post("/register",authController.userRegister)
router.post("/login",authMiddleware.authMiddleware,authController.userLogin)

export default router