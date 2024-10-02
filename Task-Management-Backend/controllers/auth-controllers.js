import User from "../models/user-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env-config.js";

const registerUser = async (req, res) => {
  console.log(req.body);

  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      message: "Email, username and password are required",
    });
  }

  try {
    const newUser = new User({ email, username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found. Please register.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "2d",
  });

  res
		.status(200)
		.cookie('token', token, {
			sameSite: false,
			maxAge: 24 * 60 * 60 * 1000
		})
		.json({ message: 'Login successful', user: user });
};

export default {
  registerUser,
  loginUser,
};
