import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
