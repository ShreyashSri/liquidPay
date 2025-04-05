import express from 'express'
import { getSpendingSummary, getTx, postTransaction } from '../controllers/transactions.controller.js';

const router = express.Router();

router.get("/transactions/:id", getTx)
router.get("/summary/:id", getSpendingSummary)
router.post("/postx/:id", postTransaction)


export default router;
