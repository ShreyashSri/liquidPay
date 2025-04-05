import express from 'express'
import { getSpendingSummary, getTx, postTransaction } from '../controllers/transactions.controller';

const router = express.Router();

router.get("/transactions/:id", getTx)
router.get("/summary/:id", getSpendingSummary)
router.post("/postx/:id", postTransaction)
router.post("/givereward/:id",)


export default router;
