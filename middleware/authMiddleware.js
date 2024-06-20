const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        console.log('Token:', token);  // Debugging
        const decoded = jwt.verify(token, config.jwtSecret);
        console.log('Decoded:', decoded);  // Debugging
        const user = await User.findById(decoded.user.id);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        console.log('User:', user);  // Debugging
        next();
    } catch (err) {
        console.error('Auth Error:', err.message);  // Log the error details
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
