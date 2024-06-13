const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../utils/helpers');

exports.register = async ({ name, email, password }) => {
    let user = await User.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    user = new User({
        name,
        email,
        password: hashedPassword,
    });

    await user.save();

    const token = generateToken(user);

    return { token, user: { id: user.id, name: user.name, email: user.email } };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user);

    return token;
};
