import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // Import bcrypt

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't send password in response
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      age: user.age,
      saveITCoin: user.saveITCoin,
      walletID: user.walletID,
      createdAt: user.createdAt,
      lastLoggedIn: user.lastLoggedIn,
      isVerified: user.isVerified,
      newTransactions: user.newTransactions,
    };

    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { fullname, email, age } = req.body;

    // Validate input
    if (!fullname || !email) {
      return res.status(400).json({
        success: false,
        message: "Fullname and email are required",
      });
    }

    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        fullname,
        email,
        age: age || undefined, // Only update if provided
      },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't send password in response
    const userWithoutPassword = {
      _id: updatedUser._id,
      username: updatedUser.username,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      age: updatedUser.age,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password (you should use bcrypt to compare)
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
