import express from 'express';
import { getBalance, buyCodi } from '../blockchain/codiService.js';

const router = express.Router();

// ✅ Get SIT balance for a wallet address
router.get("/balance/:address", getBalance);

// ✅ Transfer SIT tokens from app to user (buy flow)
router.post("/transfer", buyCodi);

export default router;
