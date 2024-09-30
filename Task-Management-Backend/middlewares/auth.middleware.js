import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env-config.js';

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Token expired or invalid. Please sign in again.',
            });
        }
        req.user = user; // Attach user info to request
        console.log(user); // Optional: log user info for debugging

        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticateJWT;
