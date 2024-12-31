import User from "../models/user.models.js"; // Ensure this path is correct
import { generateToken } from "../lib/utils.js"; // Import your token utility
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    console.log("Incoming Request Body: ", req.body);

    // Destructure and validate input
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username: fullName, // Map fullName to username
      email,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    // Generate a token (optional, if you're using authentication tokens)
    generateToken(newUser._id, res);

    // Respond with success
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url,
      new: true,
    });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    console.error("Check Auth Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
