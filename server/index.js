import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import blockChainRoutes from './routes/blockchain.routes.js';
import goalRoutes from './routes/goals.routes.js';
import txRoutes from './routes/transaction.routes.js';
import transactionsRoutes from './routes/transactions.routes.js';
import mongoose from 'mongoose';
import { buyCodi, getBalance } from "./blockchain/codiService.js";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/web3', blockChainRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/transactions', txRoutes);
app.use('/api/transactions', transactionsRoutes);

try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')

} catch (error) {
    console.error(error)
}



app.listen(process.env.PORT || 8180, () => {
    console.log(`Server is running on port ${process.env.PORT || 8180}`);
})