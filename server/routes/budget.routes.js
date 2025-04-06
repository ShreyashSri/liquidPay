import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getBudgetItems, addBudgetItem, deleteBudgetItem, updateBudgetItem } from '../controllers/budget.controller.js';

const router = express.Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Get all budget items for a user
router.get("/", getBudgetItems);

// Add a new budget item
router.post("/add-item", addBudgetItem);

// Delete a budget item
router.delete("/:itemId", deleteBudgetItem);

// Update a budget item
router.patch("/:itemId", updateBudgetItem);

export default router;