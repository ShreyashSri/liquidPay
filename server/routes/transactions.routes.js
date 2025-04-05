import express from 'express';
import { getUserTransactions } from '../controllers/transactions.controller.js';

const router = express.Router();

// Get user's transactions
router.get('/:userId', getUserTransactions);

export default router; 