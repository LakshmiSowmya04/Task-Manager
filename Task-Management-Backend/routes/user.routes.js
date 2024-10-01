import express from 'express';
import authenticateJWT from '../middlewares/auth.middleware.js';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', authenticateJWT, logoutUser);

router.get('/profile', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Welcome to your profile!', user: req.user });
});

export default router;
