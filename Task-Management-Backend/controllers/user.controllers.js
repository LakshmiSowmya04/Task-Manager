import User from '../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env-config.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);

    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already registered with this email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();
    res.status(201).json(new ApiResponse(201, null, "User created successfully."));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found. Please register.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '2h',
    });

    res.status(200).json(new ApiResponse(200, { token }, "Login successful."));
});

export const logoutUser = (req, res) => {
    res.status(200).json(new ApiResponse(200, null, "Logout successful."));
};
