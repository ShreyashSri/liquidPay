import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import mongoose from 'mongoose';
import { buyCodi, getBalance } from "./blockchain/codiService.js";

const app = express();

dotenv.config();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')

} catch (error) {
    console.error(error)
}

app.get("/balance/:address", async (req, res) => {
    try {
        const balance = await getBalance(req.params.address);
        res.json({ address: req.params.address, balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.post("/buy", async (req, res) => {
    const { to, amount } = req.body;
    try {
        const txHash = await buyCodi(to, amount);
        res.json({ txHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT || 8180, () => {
    console.log(`Server is running on port ${process.env.PORT || 8180}`);
})