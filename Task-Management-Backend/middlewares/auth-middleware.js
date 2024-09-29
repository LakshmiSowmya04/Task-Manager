const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, "MY_future_JWT_SECRET_IN_ENV", (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token expired or invalid. Please sign in again." });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;