const authService = require('../services/authService');
const { isValidEmail, errorResponse } = require('../utils/helpers');

exports.register = async (req, res) => {
    const { email } = req.body;
    if (!isValidEmail(email)) {
        return errorResponse(res, 400, 'Invalid email address');
    }

    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json({ token });
    } catch (error) {
        errorResponse(res, 400, error.message);
    }
};
