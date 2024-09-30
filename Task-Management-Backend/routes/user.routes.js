import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import authenticateJWT from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login an existing user
router.post('/login', loginUser);

// Route to logout a user
router.post('/logout', authenticateJWT, logoutUser);

// Protected route example
router.get('/profile', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Welcome to your profile!', user: req.user });
});

export default router;
