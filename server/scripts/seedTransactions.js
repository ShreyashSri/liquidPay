// scripts/seedTransactions.js
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import mockTransactions from '../mockData/transactions.js';

// MongoDB connection URL
const MONGODB_URI = 'mongodb+srv://shreyashegdeplus06:ShreyashegdePlus06@flux-cluster.vyqr9.mongodb.net/?retryWrites=true&w=majority&appName=Flux-Cluster';

async function seedTransactions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');

    // Find the user by email
    const user = await User.findOne({ email: 'shreyashegdeplus06@gmail.com' });

    if (!user) {
      console.error('❌ User not found with email: shreyashegdeplus06@gmail.com');
      return;
    }

    console.log(`👤 Found user: ${user.username || user.email} (ID: ${user._id})`);

    // Update the user's transactions
    user.transactions = mockTransactions;
    await user.save();

    console.log('🎉 Successfully updated user transactions with mock data');
  } catch (error) {
    console.error('💥 Error seeding transactions:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Execute the function
seedTransactions();
