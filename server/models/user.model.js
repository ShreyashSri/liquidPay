import mongoose from "mongoose";

const transactionItemSchema = new mongoose.Schema({
  item: { type: String, required: true },     // e.g., "Food delivery"
  amount: { type: Number, required: true },
  time: {type: String, required: true},
});

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  needs: [transactionItemSchema],
  wants: [transactionItemSchema],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: {type: Number, required: true},
  saveITCoin: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiration: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordTokenExpiration: { type: Date },
  resetPasswordOTP: { type: String },

  // 👇 Structured Transactions
  transactions: [transactionSchema]
});

const User = mongoose.model('User', userSchema);
export default User;
