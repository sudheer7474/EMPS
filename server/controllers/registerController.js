import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Create a JWT token
    const token = jwt.sign(
      { _id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    return res.status(201).json({
      success: true,
      token,
      user: { _id: savedUser._id, name: savedUser.name, role: savedUser.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { register };
