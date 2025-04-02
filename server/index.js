import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import budgetRoutes from './routes/budget.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import employerRoutes from './routes/employer.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import trackerRoutes from './routes/tracker.routes.js';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/tracker', trackerRoutes);

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