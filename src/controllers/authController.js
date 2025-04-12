const { signup, login } = require('../services/authService');

exports.signup = async (req, res) => {
    const result = await signup(req.body);
    res.status(result.status).json(result);
};

exports.login = async (req, res) => {
    const result = await login(req.body);
    res.status(result.status).json(result);
};
