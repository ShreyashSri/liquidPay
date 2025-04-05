import express from 'express'
import { genGoals } from '../controllers/goals.controller';

const router = express.Router();

router.get("/generategoals/:id",genGoals)


export default router;
