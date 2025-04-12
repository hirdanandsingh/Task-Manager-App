const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async ({ name, email, password }) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return { status: 400, data: { message: 'Email already exists' } };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return { status: 201, data: { message: 'User registered successfully', user: newUser } };
    } catch (err) {
        return { status: 500, data: { message: 'Signup failed', error: err.message } };
    }
};

exports.login = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return { status: 404, data: { message: 'User not found' } };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { status: 401, data: { message: 'Invalid credentials' } };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return {
            status: 200,
            data: { message: 'Login successful', token }
        };
    } catch (err) {
        return { status: 500, data: { message: 'Login failed', error: err.message } };
    }
};
