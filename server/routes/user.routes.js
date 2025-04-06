import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get user profile
router.get("/profile", getUserProfile);

// Update user profile
router.put("/update", updateUserProfile);

// Change password
router.put("/change-password", changePassword);

export default router;
