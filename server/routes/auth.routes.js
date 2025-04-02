import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkAuth, register, login, verifyMail, logout, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/checkAuth", verifyToken, checkAuth)
router.post("/register", register )
router.post("/login", login )
router.post("/verifyEmail", verifyMail) 
router.post("/logout", logout)
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword/:resetPasswordToken", resetPassword)


export default router;
