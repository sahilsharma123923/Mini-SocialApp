import express from 'express'
import authController from '../controllers/auth.controller'

const router=express.Router();

router.post("/register",authController.userRegister)
router.post("/login",authController.userLogin)
router.post("/google",authController.googleAuth)
router.get("/:id",authController.getUserProfile)

export default router