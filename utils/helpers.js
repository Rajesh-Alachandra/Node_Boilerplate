const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const moment = require('moment');
const config = require('../config/config');

//! Function to validate email addresses
exports.isValidEmail = (email) => {
    return validator.isEmail(email);
};

//! Function to send standardized error responses
exports.errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
};

//! Function to generate JWT token
exports.generateToken = (user) => {
    const payload = {
        user: {
            id: user._id,  // Make sure to use _id
            name: user.name
        },
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};


//! Function to hash passwords
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//! Function to compare passwords
exports.comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};

//! Function to validate product data
exports.validateProductData = (data) => {
    const { name, description, price } = data;
    if (!name || !description || typeof price !== 'number') {
        throw new Error('Invalid product data');
    }
    return true;
};

//! Function to format dates
exports.formatDate = (date, format = 'YYYY-MM-DD') => {
    return moment(date).format(format);
};
