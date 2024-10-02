import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env-config.js';

const authenticateJWT = (req, res, next) => {
	// Correctly accessing the cookies
	const token =
		req.cookies?.token || req.headers.cookie?.split('token=')[1]?.split(';')[0];

	if (!token) {
		req.user = null;
		return res
			.status(401)
			.json({ message: 'Access denied. No token provided.' });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({
				message: 'Token expired or invalid. Please sign in again.',
			});
		}
		req.user = user;
		console.log('user:- ', user);

		next();
	});
};

export default authenticateJWT;
