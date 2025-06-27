require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/usersModel");

/**
 * Sign up a new user
 */
exports.signup = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await UserModel.createUser(
      email,
      password,
      firstname,
      lastname
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Log in an existing user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Exclude password from response
    const { password: pw, ...userWithoutPassword } = user;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get user profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.user.id);
    res.status(200).json({
      message: "User profile retrieved successfully",
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id; // Get user ID from the authenticated request
    const { firstname, lastname } = req.body;
    if (!id) {
      return res.status(403).json({ message: "Forbidden: Invalid user ID" });
    }
    // Validate input
    if (!firstname || !lastname) {
      return res
        .status(400)
        .json({ message: "Firstname and Lastname are required" });
    }
    // Update user information
    const updatedUser = await UserModel.updateUser(id, firstname, lastname);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
