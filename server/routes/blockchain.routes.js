import express from 'express';
import { getBalance, buyCodi } from '../blockchain/codiService.js';

const router = express.Router();

// ✅ Get SIT balance for a wallet address
router.get("/balance/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await getBalance(address);
    res.json({ success: true, balance });
  } catch (error) {
    console.error("Error in balance route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Transfer SIT tokens from app to user (buy flow)
router.post("/transfer", buyCodi);

export default router;
